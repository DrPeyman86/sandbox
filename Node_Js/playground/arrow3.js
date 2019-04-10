const tasks = {
    tasks: [{
        text: 'Grocery SHopping',
        completed: false
    },
    {
        text: 'Eating',
        completed: false
    },
    {
        text: 'film course',
        completed: true
    }],
    getTasksToDo() {
        return this.tasks.filter((task)=> task.completed === false)
    }
}

console.log(tasks.getTasksToDo());

