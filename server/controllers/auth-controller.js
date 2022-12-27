const { 
    fetchUserByEmail,
    createUser, 

    fetchDocumentByUser,
    createDocumentByUser,
    fetchDocumentInsideByUser,
    changeComment,

    dailyReport,
    dailyReport2,
    changeAdminComment,

    dateForConsolidatedReport,
    consolidatedReport,
    consolidatedReportInside,
    consolidatedReportForXls,

    forgotPassLink,
    forgotPassVerify,
    ResetPass,

    getUsers,
    blockUser,
    deleteCardFromUser,
    changePassAdmin,
    changePassAdminCheck,
    changeTimeEndAdmin,
    changeTimeStartAdmin,
} = require('../services/users-service');
const jwt = require("jsonwebtoken");
const passport = require('passport');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");


//Auth
//регистрация
const signUpUser = async (req, res, next) => {
const { email, first_name, last_name, password } = req.body;

try {
    const userDb = await fetchUserByEmail(email)  
    if (userDb) {
        return res.status(422).json({
            error: { status: 422, data: "Пользователь с таким адресом электронной почты уже существует."}
        });
    }

    const pwd_hash = await bcrypt.hash(password, 10);
    const user = {
        email,
        first_name,
        last_name,
        pwd_hash,
    }
    const newUser = await createUser(user);
    res.status(201).json({user_id: newUser.id});
} catch(err) {
    return next(err);
}
}
//вход в учетку
const loginUser = (req, res, next) => {
    passport.authenticate(
        'login', (err, user, info) => {
            if (err) return res.status(500).send();
            if (!user) {
                return res.status(401)
                .json({ error: { status: 401,data: info.message }})
            }
            req.login(user, (err) => {
                if (err) return next(err);
                const { id, first_name, last_name, email, isadmin, blocked } = req.user;
                if (user.blocked!==false) {
                    return res.status(422).json({
                        error: { status: 422, data: "Ошибка! У вас нет доступа к системе"}
                    });
                }
                const token = jwt.sign({id: user.id, email: user.email,first_name: first_name,last_name: last_name,isadmin: isadmin}, process.env.SESSION_SECRET, {expiresIn: "24h"})
                let options = {
                    maxAge: 7 * 24 * 60 * 60 * 1000, // would expire after 15 minutes
                    httpOnly: true, // The cookie only accessible by the web server
                    signed: true // Indicates if the cookie should be signed
                }
                return res.cookie('x-access-token', 'token', options), res.header('x-access-token', [token]),res.json({token,id, first_name, last_name, email, isadmin});
            })
        }
    )(req, res, next);
}
//выход с учетки
const logoutUser = (req, res, next) => {
    req.logout();
    res.clearCookie('connect.sid');
    res.clearCookie('x-access-token');
    req.session.destroy(function (err) {
        res.status(200).send();
    });
    }
//END


//User actions
//Создание отметки в documents
const createDocumentByUserController = async (req, res, next) => {
    const { user_id,comment, office } = req.body;
    try {
        const document = {
            user_id, 
            comment,
            office
        }
        const newDocument = await createDocumentByUser(document);
        return res.status(201).json(newDocument);
    } catch(err) {
        return next(err);
    }
}
//вывод информации с таблицы с условием
const fetchDocumentByUserController = async (req, res, next) => {
    try {
        const {user_id} = req.params
        const document = await fetchDocumentByUser(user_id)
        if (!document) {
            return res.status(422).json({
                error: { status: 422, data: "Нет данных."}
            });
        }
    
        //возвращает все документы
        res.status(200).json(document)
    
        //возвращает только 1 документ
        // return res.json(document)
        // next()
    } catch(err) {
        return next(err);
    }
}
//вывод информации с таблицы с условием
const fetchDocumentInsideByUserController = async (req, res, next) => {
    try {
        
        const {user_id,id_smeny} = req.params
        const document = await fetchDocumentInsideByUser(user_id,id_smeny)
        if (!document) {
            return res.status(422).json({
                error: { status: 422, data: "Нет данных."}
            });
        }
    
        // //возвращает все документы
        return res.json(document)
    
        //возвращает только 1 документ
        // return res.json(document)
        next()
    } catch(err) {
        return next(err);
    }
}

const changeCommentController = async (req, res, next) => {
    const { uid, comment } = req.body;
    try {
        const newDocument = await changeComment(uid, comment);
        return res.status(200).json(newDocument);
    } catch(err) {
        return next(err);
    }
}    
    
//END


//Consolidated Report for Admin
//вывод Admin документов
const dateForConsolidatedReportController = async (req, res, next) => {
    try {
        const {dt1,dt2} = req.params
        const newDocument = await dateForConsolidatedReport(dt1,dt2)
        if (!newDocument) {
            return res.status(422).json({
                error: { status: 422, data: "Нет данных."}
            });
        }
        return res.json(newDocument)
    } catch(err) {
        return next(err);
    }
}
const consolidatedReportController = async (req, res, next) => {
    try {
        const {dt1,dt2,user} = req.params
        const newDocument = await consolidatedReport(dt1,dt2,user)
        if (!newDocument) {
            return res.status(422).json({
                error: { status: 422, data: "Нет данных."}
            });
        }
        return res.json(newDocument)
    } catch(err) {
        return next(err);
    }
}
const consolidatedReportInsideController = async (req, res, next) => {
    try {
        const {dt1,dt2} = req.params
        const newDocument = await consolidatedReportInside(dt1,dt2)
        if (!newDocument) {
            return res.status(422).json({
                error: { status: 422, data: "Нет данных."}
            });
        }
        return res.json(newDocument)
    } catch(err) {
        return next(err);
    }
}

const consolidatedReportForXlsController = async (req, res, next) => {
    try {
        const {dt1,dt2} = req.params
        const newDocument = await consolidatedReportForXls(dt1,dt2)
        if (!newDocument) {
            return res.status(422).json({
                error: { status: 422, data: "Нет данных."}
            });
        }
        return res.json(newDocument)
    } catch(err) {
        return next(err);
    }
}
//END

//Daily report for Admin
const dailyReportController = async (req, res, next) => {
    try {
        const {id_smeny} = req.params
        const document = await dailyReport(id_smeny)
        if (!document) {
            return res.status(422).json({
                error: { status: 422, data: "Нет данных."}
            });
        }
        //возвращает все документы
        res.status(200).json(document)
    } catch(err) {
        return next(err);
    }
}
const dailyReportController2 = async (req, res, next) => {
    try {
        const {user_id,id_smeny} = req.params
        const document = await dailyReport2(user_id,id_smeny)
        if (!document) {
            return res.status(422).json({
                error: { status: 422, data: "Нет данных."}
            });
        }
        //возвращает все документы
        res.status(200).json(document)
    } catch(err) {
        return next(err);
    }
}
const changeAdminCommentController = async (req, res, next) => {
    const { uid, comment } = req.body;
    try {
        const newDocument = await changeAdminComment(uid, comment);
        return res.status(200).json(newDocument);
    } catch(err) {
        return next(err);
    }
}   
//End

//Reset password from user
const forgotPassLinkController = async (req, res, next) => {
const {email} = req.body;
try {
    const newDocument = await forgotPassLink(email)
    if (!newDocument) {
        return res.status(422).json({
            error: { status: 422, data: "Нет данных."}
        });
    }
    const secret = process.env.SESSION_SECRET + newDocument.password;
    const token = jwt.sign({ email: newDocument.email, id: newDocument.id }, secret, {expiresIn: "5m",});
      const link = `http://localhost/resetpassword/${newDocument.id}/${token}`;
      var transporter = nodemailer.createTransport({
        host: "smtp.yandex.kz",
        port: 465,
        secure: true,
        auth: {
        user: "vorozheikin.i@bestprofi.com", 
        pass: "d8365382",
        },
      });
      var mailOptions = {
        from: "vorozheikin.i@bestprofi.com",
        to: newDocument.email,
        subject: "Password Reset",
        text: "Password Reset",
        html: `<div style="background:#eee;padding:30px;">
                    <div style="background:#fff;padding: 15px 20px;width: 550px;border: 1px solid #e3e3e5;border-radius:3px;margin: 0 auto;font: normal 13px/19px Verdana;box-shadow: 0 3px 7px rgba(0,0,0,.1);">
                        <h2 style="font:normal 21px/48px Arial;color: #222;padding: 0 0 0 68px;background: url(d&#097;ta:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAABKVBMVEVHcEyBo6GBo6GBoqCBo6CCoqCCoZ+Co6GBoZ+LoqJ/oKCCo6CAp52Co6GAo5+CpKCBoaGAoZ+BoqCDoqGCo6GBoqGBoqCCo6GAo6CCo6KAoqGCo6GCoaGAoZ+Co6GCoaGCoqCBop9/oJ6CoaF/n5+Co5+CoqGCo6Hx69GAoJ6BoqDw6tDv6c9/n53m48pSXXPp5czDzLvr582mt618nJq2wbKRq6SWrqjJz73i4Mlwi428x7dcb3mIpaLd2cJ3lJGJjpRSXXTRz7lqhIWrvLCeq6B0kY+xvrB5mJZUYnTQ1MGns6awtKqSp595j4ydsKaWoJRecXpmgIJnf4XW2MOEpKHM0r9uioqIo59SX3KsrqiFmZGkrqDDw7CnraNXaXHX2sXHyLTX0rwvKqOYAAAAJ3RSTlMAZPjW9Y3zE/0FF24bk80jUO7palTJ3rpadPH9SvZ7KYez9rQQxc8DeY0YAAACb0lEQVR4Xo3UZ0PqMBiG4QgtbdkiDkQ9LnyStsw93Hvvcfb6/z/iNBI4panA9fl+Y2JCiSS6EJufm9YD03PzsYUwGUOLxDEkHtFG5NFYAJJ1NUr8GSsB+FIyhl//KYgPbSXkPq1ghFDS28/oGCk75ekxwg64oYn0qPUvX7vHLwzZpOu8I/Zv/qaU2vvnwOLg5EZwTE/3K3cA4oYYWBnbU3rGAGTE/QbG97RbAxAKEy42QU9/8gGovNcCE/Rft004FP4SI5P0Bw8M3IwzEJ+kL27nweUIiU7U9wegkYUJ+l+PT3voSZPY2L548WaiTyXzY/vtc4aBDTLnSU3vfg6e4BIk0/ivUS2XW+Vq09V/uSgema4kRXQMlKnFo4LtWv+xc1qDyzIJQGBtKrjWfzjHMGWwJdN299e99Y/y8EgNDt2mbuK8Yvsuwf6/tSv3xYOLI3itiYvbqXj7ym2n85aHlyqeRlOcwKJ9hRsGH0kSBld/rwvP7YqYpFYdPnRNPO8yT46BZrXQn6jnIcv1f0At3puOz1clsa3rGmT8a6atAzizacF8d3MoBq4YJKFN4lABVCl9hsmxH70B+xtkq4SLKkDj0mo3TS4v/kJpDxLxmSEZAF27dLzDB+5L9N13BkmE9BhbAHu12tUGY/e7vf7wFJJZgwiJEF4al3bh759Dsf6u9IrEx1hIZp2Jlm1Zlljfp9eXiMsUgFq9RfmTquye7Jn+V+CeyMK5tbuT+tnJ7SmDROf9kOQiHHnGmAnZ4hKRJOL40GyC+DAyIfgKRQziL6wqPvlqmHxMm8nBTc9NbZIxtLS6EUwtK6ngmprUiNc/tS4oi11zJywAAAAASUVORK5CYII=) no-repeat 0 50%;margin: 0;">
                            Восстановление пароля
                        </h2>
                
                        <div style="padding: 15px 0;"> 
                            Уважаемый <b>${newDocument.email}</b>. Вы сделали запрос на получение забытого пароля на сайте Staff-Rencore Чтобы получить новый пароль, пройдите по ссылке ниже:
                        </div>
                        <a href="${link}" style="width: 400px;margin:0 auto;display: block;background: #4CAF50 url(d&#097;ta:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAwCAIAAABfUYfWAAAAH0lEQVQImWMw6DdgYmBgYGJkZESlmZiwijPhEB8g9QD08gGkFcH1FgAAAABJRU5ErkJggg==) repeat-x 0 0;color: #fff;font-weight:bold; line-height: 44px;text-align: center;text-transform: uppercase;text-decoration: none;border-radius: 3px;text-shadow: 0 1px 3px rgba(0,0,0,.35);border: 1px solid #388E3C;box-shadow: inset 0 1px rgba(255,255,255,.4);">
                            Восстановить пароль
                        </a>
                        <div style="padding: 15px 0;"> 
                            Если вы не делали запроса для получения пароля, то просто удалите данное письмо. Ваш пароль храниться в надежном месте и недоступен посторонним лицам.
                        </div>
                    </div>
                </div>`,
      };
    
      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return res.json(link)
} catch(err) {
    return next(err);
}
}
const forgotPassVerifyController = async (req, res, next) => {
    const {id,token} = req.params;
    try {
        const oldUser = await forgotPassVerify(id)
        if (!oldUser) {
            return res.status(422).json({
                error: { status: 422, data: "Нет данных."}
            });
        }
        const secret =  process.env.SESSION_SECRET  + oldUser.password;
        const verify = jwt.verify(token, secret);
        res.send({status: true});
    } catch (error) {
        console.log(error);
        res.send({status: false});
    }
}
const ResetPassController = async (req, res, next) => {
const { password,id, token } = req.body;
try {
    const oldUser = await ResetPass(id)
    if (!oldUser) {
        return res.status(422).json({
            error: { status: 422, data: "Нет данных."}
        });
    }
    const secret = process.env.SESSION_SECRET + oldUser.password;
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newPass = await forgot2Pass(encryptedPassword,id)
    console.log(newPass);
    res.status(200).json("Пароль успешно обновлен")
} catch(err) {
    return next(err);
}
}
//END


//admin privelegies on Users link
const changePassAdminController = async (req, res, next) => {
    const { password,id } = req.body;
    try {
        const oldUser = await changePassAdminCheck(id)
        if (!oldUser) {
            return res.status(422).json({
                error: { status: 422, data: "Нет данных."}
            });
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newPass = await changePassAdmin(encryptedPassword,id)
        return res.status(201).json();
    } catch(err) {
        return next(err);
    }
}
const blockUserController = async (req, res, next) => {
    const {id, blocked} = req.body;
    try {
        const Document = { id, blocked }
        const newDocument = await blockUser(Document);
        res.status(200).send();
    } catch(err) {
        return next(err);
    }
}
const deleteCardFromUserController = async (req, res, next) => {
    const {id} = req.body;
    try {
        const newDocument = await deleteCardFromUser(id)
        res.status(200).send();
    } catch(err) {
        return next(err);
    }
}

//вывод пользователей
const getUsersController = async (req, res, next) => {
    try {
        const newDocument = await getUsers()
        if (!newDocument) {
            return res.status(422).json({
                error: { status: 422, data: "Нет данных."}
            });
        }
        return res.json(newDocument)
    } catch(err) {
        return next(err);
    }
    }

const changeTimeStartAdminController = async (req, res, next) => {
    const { id, tmst } = req.body;
    try {
        // const document = { id, tmst }
        const newDocument = await changeTimeStartAdmin(id, tmst);
        return res.status(200).json(newDocument);
    } catch(err) {
        return next(err);
    }
}

const changeTimeEndAdminController = async (req, res, next) => {
    const { id, tmst } = req.body;
    try {
        // const Document = { id, tmend }
        const newDocument = await changeTimeEndAdmin(id, tmst);
        return res.status(200).json(newDocument);
    } catch(err) {
        return next(err);
    }
}
//End

module.exports = {
    signUpUser, 
    loginUser, 
    logoutUser,

    fetchDocumentInsideByUserController,
    fetchDocumentByUserController,
    createDocumentByUserController,
    changeCommentController,

    dailyReportController,
    dailyReportController2,
    changeAdminCommentController,

    dateForConsolidatedReportController,
    consolidatedReportController,
    consolidatedReportInsideController,
    consolidatedReportForXlsController,

    forgotPassLinkController,
    forgotPassVerifyController,
    ResetPassController,
    
    getUsersController,
    blockUserController,
    deleteCardFromUserController,
    changePassAdminController,
    changeTimeStartAdminController,
    changeTimeEndAdminController,
}