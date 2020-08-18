const Database = require('./database/db');
const { subjects, weekdays, getSubject, convertHourToMinute } = require('./utils/format');


module.exports = {

    pageLanding(request, response) {
        return response.render("index.html");
    },

    async pageStudy(request, response) {
        const filter = request.query;

        if (!filter.subject || !filter.weekday || !filter.time) {
            return response.render("study.html", { filter, subjects, weekdays })
        }

        const timeToMinute = convertHourToMinute(filter.time);

        const query = `
            SELECT classes.*, proffys.*
            FROM classes JOIN proffys
            ON (classes.proffy_id = proffys.id)
            WHERE EXISTS (
                SELECT class_schedule.*
                FROM class_schedule
                WHERE class_schedule.class_id = classes.id
                AND ${filter.weekday} = class_schedule.weekday
                AND ${timeToMinute} >= class_schedule.time_from
                AND ${timeToMinute} < class_schedule.time_to
            )
            AND classes.subject = '${filter.subject}' 
        `;

        const queryTest = `
        SELECT classes.*, proffys.*
        FROM classes JOIN proffys
        ON (classes.proffy_id = proffys.id);`

        try {
            const db = await Database;
            const proffys = await db.all(queryTest);

            // console.log(`\nsubjects: ${subjects[9]}`);
            // console.log(`\nproffys: ${proffys.subject}\n`);
            
            proffys.map((proffy) => {
                // console.log(`proffy.subject: ${proffy.subject}`);
                // console.log(`${getSubject(8)}`);
                proffy.subject = getSubject(proffy.subject);
            });


            return response.render("study.html", { proffys, filter, subjects, weekdays })
        } catch (error) {
            console.log(error);
        }

        return response.render("study.html", { proffys, filter, subjects, weekdays });
    },

    pageGiveClasses(request, response) {
        return response.render("give-classes.html", { subjects, weekdays });
    },

    async saveClasses(request, response) {
        const createProffy = require('./database/createProffy');
        
        const proffyValue = {
            name: request.body.name,
            avatar: request.body.avatar,
            whatsapp: request.body.whatsapp,
            bio: request.body.bio
        };

        const classValue = {
            subject: request.body.subject,
            cost: request.body.cost
        };

        const classScheduleValues = request.body.weekday.map((weekday, index) => {
            return {
                weekday,
                time_from: convertHourToMinute(request.body.time_from[index]),
                time_to: convertHourToMinute(request.body.time_to[index])
            }
        });

        try {
            const db = await Database;
            await createProffy(db, { proffyValue, classValue, classScheduleValues });

            let queryString = "?subject=" + request.body.subject;
            queryString += "&weekday=" + request.body.weekday[0];
            queryString += "&time=" + request.body.time_from[0];
            /* console.log(request.body); */
            return response.redirect("/study" + queryString);

        } catch (error) {
            console.log(error);
        }
        
    }
}