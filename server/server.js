const express = require('express');
const cors = require("cors");


const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

require('dotenv').config();
require('./config/db');

var corsOptions = {
  origin: "http://localhost:3001"
};

// const nodemailer = require("nodemailer");
// async function main() {
//   let transporter = nodemailer.createTransport({
//     host: "smtp.yandex.kz",
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: "vorozheikin.i@bestprofi.com", // generated ethereal user
//       pass: "d8365382", // generated ethereal password
//     },
//   });

//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" vorozheikin.i@bestprofi.com',
//     to: "d.ismagulov@bestprofi.com", 
//     subject: "Hello ✔", 
//     text: "Hello world?",
//     html: `<div style="background:#eee;padding:30px;">
//               <div style="background:#fff;padding: 15px 20px;width: 550px;border: 1px solid #e3e3e5;border-radius:3px;margin: 0 auto;font: normal 13px/19px Verdana;box-shadow: 0 3px 7px rgba(0,0,0,.1);">
//                   <h2 style="font:normal 21px/48px Arial;color: #222;padding: 0 0 0 68px;background: url(d&#097;ta:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAABKVBMVEVHcEyBo6GBo6GBoqCBo6CCoqCCoZ+Co6GBoZ+LoqJ/oKCCo6CAp52Co6GAo5+CpKCBoaGAoZ+BoqCDoqGCo6GBoqGBoqCCo6GAo6CCo6KAoqGCo6GCoaGAoZ+Co6GCoaGCoqCBop9/oJ6CoaF/n5+Co5+CoqGCo6Hx69GAoJ6BoqDw6tDv6c9/n53m48pSXXPp5czDzLvr582mt618nJq2wbKRq6SWrqjJz73i4Mlwi428x7dcb3mIpaLd2cJ3lJGJjpRSXXTRz7lqhIWrvLCeq6B0kY+xvrB5mJZUYnTQ1MGns6awtKqSp595j4ydsKaWoJRecXpmgIJnf4XW2MOEpKHM0r9uioqIo59SX3KsrqiFmZGkrqDDw7CnraNXaXHX2sXHyLTX0rwvKqOYAAAAJ3RSTlMAZPjW9Y3zE/0FF24bk80jUO7palTJ3rpadPH9SvZ7KYez9rQQxc8DeY0YAAACb0lEQVR4Xo3UZ0PqMBiG4QgtbdkiDkQ9LnyStsw93Hvvcfb6/z/iNBI4panA9fl+Y2JCiSS6EJufm9YD03PzsYUwGUOLxDEkHtFG5NFYAJJ1NUr8GSsB+FIyhl//KYgPbSXkPq1ghFDS28/oGCk75ekxwg64oYn0qPUvX7vHLwzZpOu8I/Zv/qaU2vvnwOLg5EZwTE/3K3cA4oYYWBnbU3rGAGTE/QbG97RbAxAKEy42QU9/8gGovNcCE/Rft004FP4SI5P0Bw8M3IwzEJ+kL27nweUIiU7U9wegkYUJ+l+PT3voSZPY2L548WaiTyXzY/vtc4aBDTLnSU3vfg6e4BIk0/ivUS2XW+Vq09V/uSgema4kRXQMlKnFo4LtWv+xc1qDyzIJQGBtKrjWfzjHMGWwJdN299e99Y/y8EgNDt2mbuK8Yvsuwf6/tSv3xYOLI3itiYvbqXj7ym2n85aHlyqeRlOcwKJ9hRsGH0kSBld/rwvP7YqYpFYdPnRNPO8yT46BZrXQn6jnIcv1f0At3puOz1clsa3rGmT8a6atAzizacF8d3MoBq4YJKFN4lABVCl9hsmxH70B+xtkq4SLKkDj0mo3TS4v/kJpDxLxmSEZAF27dLzDB+5L9N13BkmE9BhbAHu12tUGY/e7vf7wFJJZgwiJEF4al3bh759Dsf6u9IrEx1hIZp2Jlm1Zlljfp9eXiMsUgFq9RfmTquye7Jn+V+CeyMK5tbuT+tnJ7SmDROf9kOQiHHnGmAnZ4hKRJOL40GyC+DAyIfgKRQziL6wqPvlqmHxMm8nBTc9NbZIxtLS6EUwtK6ngmprUiNc/tS4oi11zJywAAAAASUVORK5CYII=) no-repeat 0 50%;margin: 0;">
//                       Восстановление пароля
//                   </h2>

//                   <div style="padding: 15px 0;"> 
//                       Уважаемый <b>LOGIN</b>. Вы сделали запрос на получение забытого пароля на сайте Staff-Rencore Чтобы получить новый пароль, пройдите по ссылке ниже:
//                   </div>
//                   <a href="" style="width: 400px;margin:0 auto;display: block;background: #4CAF50 url(d&#097;ta:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAwCAIAAABfUYfWAAAAH0lEQVQImWMw6DdgYmBgYGJkZESlmZiwijPhEB8g9QD08gGkFcH1FgAAAABJRU5ErkJggg==) repeat-x 0 0;color: #fff;font-weight:bold; line-height: 44px;text-align: center;text-transform: uppercase;text-decoration: none;border-radius: 3px;text-shadow: 0 1px 3px rgba(0,0,0,.35);border: 1px solid #388E3C;box-shadow: inset 0 1px rgba(255,255,255,.4);">
//                       Восстановить пароль
//                   </a>
//                   <div style="padding: 15px 0;"> 
//                       Если вы не делали запроса для получения пароля, то просто удалите данное письмо. Ваш пароль храниться в надежном месте и недоступен посторонним лицам.
//                   </div>
//               </div>
//           </div>`,
//   });

//   console.log("Message sent: %s", info.messageId);
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// }
// main().catch(console.error);

const isProduction = process.env.NODE_ENV === 'production';

const passport = require('passport');
require('./config/passport');

const morgan = require('morgan')

const app = express();

// app.use(express.static('build'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if (isProduction) {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

const compression = require("compression");
app.use(compression());

const helmet = require("helmet")
app.use(helmet())

var cookieParser = require('cookie-parser');
app.use(cookieParser(process.env.SESSION_SECRET));

const { pool } = require('./config/db');
app.use(session({ 
  store: new pgSession({
    pool
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction, // SSL only in production
    maxAge: 7 * 24 * 60 * 60 * 1000 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

const routes = require('./routes');

if(isProduction){
  const path = require('path');
  app.use(express.static('../client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'..', 'client', 'build', 'index.html'));
  });
}

app.use('/api', routes);
  
app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).send({
      error: {
          status: error.status || 500,
          data: error.message || 'Internal Server Error',
      },
  })
})


app.use(cors(corsOptions));

app.listen(process.env.PORT, () => {
	console.log(`API listening at http://localhost:${process.env.PORT}`);
});