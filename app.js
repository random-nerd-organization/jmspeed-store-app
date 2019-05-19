const Koa = require('koa');
const KoaRouter = require('koa-router');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = KoaRouter();

// static db
const { products, cartProducts } = require('./db-static');

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cacht: false,
    debug: false
});

app.use(bodyParser());

app // router middleware
    .use(router.routes())
    .use(router.allowedMethods());

// setup routes
router.get('/', async ctx => {
    await ctx.render('index', {
        title: 'Начало'
    });
});
router.get('/products', async ctx => {
    await ctx.render('products', {
        title: 'Продукти',
        data: products
    });
});
router.get('/terms', async ctx => {
    await ctx.render('terms', {
        title: 'Условия'
    });
});
router.get('/cart', async ctx => {
    await ctx.render('cart', {
        title: 'Количка',
        data: cartProducts
    });
});
router.post('/order', async ctx => {
    console.log(ctx.request.body);
    ctx.redirect('/');
});


app.listen(process.env.PORT || 3000, () => {
    console.log('Server started');
});