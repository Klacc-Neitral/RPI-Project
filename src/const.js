const Status = {
    BACKLOG: 'backlog',
    PROCESSING: 'in-progress',
    READY: 'done',
    TRASH: 'trash'
};

const StatusLabel = {
    [Status.BACKLOG]: `Бэклог`,
    [Status.PROCESSING]: `В процессе`,
    [Status.READY]: `Готов`,
    [Status.TRASH]: `Корзина`,
};

export {Status, StatusLabel};