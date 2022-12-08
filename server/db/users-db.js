const db = require('../config/db.js');

//Auth
const fetchUserByEmailDb = async (email) => {
    try {
        const res = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        return res.rows[0];
    } catch(e) {
        throw new Error(e.message);
    }
}

const createUserDb = async ({email, first_name, last_name, pwd_hash}) => {
    const text = `INSERT INTO users(email, first_name, last_name, pwd_hash)
                  VALUES($1, $2, $3, $4) RETURNING id`;
    const values = [email, first_name, last_name, pwd_hash];
    try {
        const res = await db.query(text, values);
        return res.rows[0];
    } catch(e) {
        throw new Error(e.message);
    }
}
//End

//Reset password from user
const forgotPassLinkDb = async (email) =>{
    try {
      const res = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
      return res.rows[0];
    } catch (e) {
        throw new Error(error.message);
    }
  
}

const forgotPassVerifyDb = async (id) =>{
    try {
      const res = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
      return res.rows[0];
    } catch (e) {
        throw new Error(error.message);
    }
  
}

const ResetPassDb = async ({password,id}) =>{
    try {
      const res = await db.query(`update users set pwd_hash = $1 where id = $2`, [password,id]);
      return res.rows[0];
    } catch (e) {
        throw new Error(error.message);
    }
}
//End

//admin privelegies on Users link
const changePassAdminCheckDB = async (id) =>{
    try {
      const res = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
      return res.rows[0];
    } catch (e) {
        throw new Error(error.message);
    }
}

const changePassAdminDB = async (password,id) =>{
    try {
      const res = await db.query(`update users set pwd_hash = $1 where id = $2`, [password,id]);
      return res.rows[0];
    } catch (e) {
        throw new Error(error.message);
    }
}

const blockUserDB = async ({id, blocked}) =>{
    try {
      const res = await db.query(`update users set blocked = $1 where id = $2`, [blocked,id]);
      return res.rows[0];
    } catch (e) {
        throw new Error(error.message);
    }
}

const deleteCardFromUserDB = async (id) =>{
    try {
      const res = await db.query(`delete from user_card where user_id = $1`, [id]);
      return res.rows[0];
    } catch (e) {
        throw new Error(error.message);
    }
}

const getUsersDb = async () => {
    try {
        const res = await db.query(`select u.id as id,u.email as email, concat(u.first_name,' ',u.last_name) as name, case when u.isadmin=1 then 'Администратор' else 'Пользователь' end as isadmin, u.blocked as blocked
        from users u ORDER BY id DESC`,[]);
        return res.rows;
    } catch(e) {
        throw new Error(e.message);
    }
}
//End

//Users tools
const fetchDocumentByUserDb = async (user_id) => {
    try {
        const res = await db.query(`select d.uid as uid, d.user_id as user_id, d.dt as dt, d.time as "time", d.comment as "comment",d.status as status,o.name as id_op,d.id_smeny as id_smeny 
        from documents d
        inner join operacii_type o on d.id_op=o.id WHERE d.user_id = $1 and (d.id_op=2 or d.id_op=1) ORDER BY d.uid DESC`, [user_id]);
        return res.rows;
    } catch(e) {
        throw new Error(e.message);
    }
}

const fetchDocumentInsideByUserDb = async (user_id,id_smeny) => {
    try {
        const res = await db.query(`select d.uid as uid, d.user_id as user_id, d.dt as dt, d.time as "time", d.comment as comment,d.status as status,o.name as id_op,d.id_smeny as id_smeny 
        from documents d inner join operacii_type o on d.id_op=o.id 
        WHERE d.user_id = $1 and d.id_smeny = $2 and (d.id_op<>2 and d.id_op<>1) ORDER BY d.uid ASC`, [user_id,id_smeny]);
        return res.rows;
    } catch(e) {
        throw new Error(e.message);
    }
}

const createDocumentByUserDb = async ({user_id, comment}) => {
    const text = `INSERT INTO documents(user_id, comment)
                  VALUES($1, $2) RETURNING *`;
    const values = [user_id, comment];
    try {
        const res = await db.query(text, values);
        return res.rows[0];
    } catch(e) {
        throw new Error(e.message);
    }
}
//End

//Daily report for Admin
const dailyReportDb = async (id_smeny) => {
    try {
        const res = await db.query(`select d.user_id as user,d.uid as uid,concat(u.first_name,' ',u.last_name) as user_id,d.dt as dt,d.time as time,d.comment as comment,(
            select case when id_op=5 then time
                    else null 
            end from documents where user_id=d.user_id and dt = $1 ORDER BY uid DESC limit 1) as time2, (
            select case when id_op=5 then comment
                    else null 
            end from documents where user_id=d.user_id and dt = $1 ORDER BY uid DESC limit 1
        ) as comment2
        from documents d inner join users u on d.user_id = u.id inner join operacii_type o on d.id_op=o.id
        where d.dt = $1 and (d.id_op=1 or d.id_op=2)
        ORDER BY d.uid DESC`,[id_smeny]);
        return res.rows;
    } catch(e) {
        throw new Error(e.message);
    }
}
const dailyReport2Db = async (user_id,id_smeny) => {
    try {
        const res = await db.query(`select d.uid as uid, d.user_id as user_id, d.dt::Date as dt, d.time as "time", d.comment as comment,d.status as status,o.name as id_op,d.id_smeny as id_smeny 
        from documents d inner join operacii_type o on d.id_op=o.id 
        WHERE d.user_id = $1 and TO_CHAR(d.dt, 'dd.MM.yyyy') = $2 and (d.id_op<>2 and d.id_op<>1) ORDER BY d.uid ASC`,[user_id,id_smeny]);
        return res.rows;
    } catch(e) {
        throw new Error(e.message);
    }
}
//End


//Consolidated Report for Admin
const dateForConsolidatedReportDb = async (dt1,dt2) => {
    try {
        const res = await db.query(`select u.id as user_id,concat(u.first_name,' ',u.last_name) as user,sum(l.late_day) as Ydays,count(l.id)-sum(l.late_day) as Zdays, sum(l.later)::time as late,sum(l.work)::time as work
        from tblate l
        left join users u ON u.id = l.iduser
        inner join tbsmeny s ON s.id = l.smena
        where s.dtstart::Date > $1 and  s.dtstart::Date <= $2
        group by u.id,u.first_name,u.last_name`,[dt1,dt2]);
        return res.rows;
    } catch(e) {
        throw new Error(e.message);
    }
}

const consolidatedReportDb = async (dt1,dt2,user) => {
    try {
        const res = await db.query(`select ROW_NUMBER () OVER (
            ORDER BY u.id
         ) as row,s.dtstart::Date as dt,u.id as user_id,concat(u.first_name,' ',u.last_name) as  user,(
			 select time 
			 from documents  
			 where user_id=u.id and id_smeny = s.id and (id_op=1 or id_op=2)) as statred, 
			 l.later as late,l.work as work
        from tblate l
        left join users u ON u.id = l.iduser
        inner join tbsmeny s ON s.id = l.smena
        where (s.dtstart::Date > $1 and  s.dtstart::Date <= $2) and u.id=$3
        group by s.dtstart,u.id,u.first_name,u.last_name, l.work , l.later,l.id,s.id
        order by s.dtstart desc`,[dt1,dt2,user]);
        return res.rows;
    } catch(e) {
        throw new Error(e.message);
    }
}

const consolidatedReportInsideDb = async (dt1,dt2) => {
    try {
        const res = await db.query(`select ROW_NUMBER () OVER (
            ORDER BY u.id
         ) as row,u.id as user_id,concat(u.first_name,' ',u.last_name) as user --,sum(l.later) as lated, sum(l.work) as worked, 
        from tblate l
        left join users u ON u.id = l.iduser
        inner join tbsmeny s ON s.id = l.smena
        where (s.dtstart::Date > $1 and  s.dtstart::Date <= $2)
        group by u.id,u.first_name,u.last_name`,[dt1,dt2]);
        return res.rows;
    } catch(e) {
        throw new Error(e.message);
    }
}

const consolidatedReportForXlsDb = async (dt1,dt2) => {
    try {
        const res = await db.query(`select ROW_NUMBER () over () as "№", to_char(s.dtstart , 'YYYY-MM-DD') as "Дата", d.time as "Время прихода", concat(u.first_name,' ',u.last_name) as "Сотрудник",
        (select case when id_op=5 then time
            else null end 
             from documents 
             where user_id=d.user_id and (dt::Date >= '2022-11-01' and  dt::Date <= '2022-11-30') 
            ORDER BY uid DESC limit 1) as "Время ухода", 
        ((select case when id_op=5 then time
            else null end 
             from documents 
             where user_id=d.user_id and (dt::Date >= $1 and  dt::Date <= $2) 
            ORDER BY uid DESC limit 1)-d.time) as "Отработано",
        (d.time-'09:00:00') as "Опоздание",
        d.comment as "Комментарии"
        from documents d
        inner join tbsmeny s ON s.id = d.id_smeny
        inner join users u ON u.id = d.user_id
        where (d.id_op=2 or d.id_op=1) and (s.dtstart::Date >= $1 and  s.dtstart::Date <= $2)
        group by s.dtstart,d.time,"Сотрудник",d.comment,d.user_id
        order by "Сотрудник",s.dtstart asc`,[dt1,dt2]);
        return res.rows;
    } catch(e) {
        throw new Error(e.message);
    }
}
//End




module.exports = {  
    fetchUserByEmailDb,
    createUserDb, 

    forgotPassLinkDb,
    forgotPassVerifyDb,
    ResetPassDb,

    fetchDocumentByUserDb,
    createDocumentByUserDb,
    fetchDocumentInsideByUserDb,

    dailyReportDb,
    dailyReport2Db,

    dateForConsolidatedReportDb,
    consolidatedReportDb,
    consolidatedReportInsideDb,
    consolidatedReportForXlsDb,

    getUsersDb,
    blockUserDB,
    deleteCardFromUserDB,
    changePassAdminDB,
    changePassAdminCheckDB,
}