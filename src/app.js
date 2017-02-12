import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import routes from './routes';
import conf from './config';

const app = express();

// uncomment next line to compile readable html
//app.locals.pretty = true;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// body-parser settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// favicon
app.use(favicon(path.join(__dirname, 'assets', 'img', 'js.png')));

// serve static files
app.use(conf.vars.virtualStorage, express.static(path.join(__dirname, '..', conf.storageFolderName)));
app.use(conf.vars.devStatic, express.static(path.join(__dirname, 'assets')));

// routes
app.use(routes);

// handle errors
app.use((err, req, res, next) => {
  res.render('error', { error: err, vars: conf.vars });
});

// disabling x-powered-by
app.disable('x-powered-by');

// listening port
app.listen(conf.port, () => console.log(`### fisejs running @ http://127.0.0.1:${conf.port}/ ###`));
