const Database = require('./db');
const createProffy = require('./createProffy');

Database.then(async (db) => {
    proffyValue = {
        name: "Vinicius Soares",
        avatar: "https://lendasdeazeroth.com.br/wp-content/uploads/2015/07/baine-bloodhoof-02.jpg",
        whatsapp: "21987654321",
        bio: "Instrutor de programação"
    }

    classValue = {
        subject: "1",
        cost: "20"
    }

    classScheduleValues = [
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },

        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    /* await createProffy(db, { proffyValue, classValue, classScheduleValues }); */
    const selectProffys = await db.all("SELECT * FROM proffys");
    /* console.log(selectProffys); */

    const seletctedProffysAndClasses = await db.all(`
        SELECT proffys.*, classes.* 
        FROM proffys JOIN classes
        ON (proffys.id = classes.proffy_id)
        WHERE classes.proffy_id = 1;
    `)
    /* console.log(seletctedProffysAndClasses); */


    const selectedClassSchedule = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "530"
        AND class_schedule.time_to > "1200" 
    `);
    
    console.log(selectedClassSchedule);
});