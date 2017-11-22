import Koa from 'koa';
import { render } from './lib/render.js';
import data from './lib/data.json';

let app = new Koa();
app.use((ctx, next) => {
    let view = ctx.url.substr(1);
    let content;
    if ( view === '' ) {
        content = render('index');
    } else if ( view === 'data' ) {
        content = data;
    } else {
        content = render(view);
    }
    ctx.body = content;
})
app.listen(3000, ()=>{
    console.log('the modules test server is starting');
})