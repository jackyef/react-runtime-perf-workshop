import React from 'react';
import { ChunkExtractor } from '@loadable/server';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import ContextProvider from '../../client/context';
import Routes from '../../client/routes';

const statsFile = path.resolve('./dist/client/loadable-stats.json');

const renderer = async (ctx, _next) => {
  console.log('Incoming request for url', ctx.url);
  
  const extractor = new ChunkExtractor({ statsFile });
  const routerContext = {};
  const helmetContext = {};
  const app = extractor.collectChunks(
    <HelmetProvider context={helmetContext}>
      <ContextProvider>
        <StaticRouter location={ctx.url} context={routerContext}>
          <Routes />
        </StaticRouter>
      </ContextProvider>
    </HelmetProvider>
  );

  const markup = renderToString(app);
  const { helmet } = helmetContext;

  ctx.body = `
    <html>
      <head>
        ${helmet && helmet.meta ? helmet.meta.toString() : ''}
        ${helmet && helmet.link ? helmet.link.toString(): ''}
        ${helmet && helmet.style ? helmet.style.toString() : ''}
        ${extractor.getLinkTags({ crossorigin: 'anonymous' })}
      </head>
      <body>
        <div id="root">${markup}</div>
        ${extractor.getScriptTags({ crossorigin: 'anonymous' })}
      </body>
    </html>
  `;
}

export default renderer;
