export default [
    {
        id: "answer01",
        value: 'Сколько планет в солнечной системе?',
        items: [7, 5, 9, 8],
        right: 8,
        type: "radio",
        component: "AnswerInput",
        context: this
    },
    {
        id: "answer02",
        value: 'Что характерно для кометы?',
        items: [
            "Имеет хвост",
            "Вращается вокруг солнца",
            "Состоит из газа и пыли",
            "Существует только во внутренней области солнечной системы",
            "Не имеет ядра"
        ],
        right: [
            "Имеет хвост",
            "Вращается вокруг солнца",
        ],
        type: "checkbox",
        component: "AnswerInput",
        context: this
    },
    {
        id: "answer03",
        value: 'Какая из планет солнечной системы имеет наибольший объем?',
        items: null,
        right: 'Юпитер',
        type: null,
        component: "AnswerTextInput",
        context: this
    },
    {
        id: "answer04",
        value: 'Как называется естественный спутник Земли?',
        items: [
            "Ганимед",
            "Луна",
            "Фобос",
            "Титан",
            "Европа"
        ],
        right: "Луна",
        type: null,
        component: "AnswerSelect",
        context: this
    },
    {
        id: "answer05",
        value: 'Достигнул ли к настоящему моменту космический аппарат Voyager-2, сконструированный "NASA",' +
        ' пределов солнечной системы?',
        items: ["Да", "Нет"],
        right: "Да",
        type: "radio",
        component: "AnswerInput",
        context: this
    }
];
