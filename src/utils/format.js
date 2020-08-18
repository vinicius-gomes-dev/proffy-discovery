const subjects = [ 
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
];

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
];


getSubject = subjectNumber => subjects[subjectNumber - 1];

convertHourToMinute =  (time) => { 
    [hour, minutes] = time.split(":")
    return Number((hour * 60) + minutes);
};


module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHourToMinute
}