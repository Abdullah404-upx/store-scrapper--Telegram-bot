class commandHanlder{
    constructor(commandName='', commandFunction=undefined){
        if(commandName)
        this.commands[commandName] = commandFunction
    }

    addCommand(commandName, commandFunction){
        this.commands[commandName] = commandFunction

    }
    getCommandFunction(commandName){
        if(commandName && this.commands[commandName])
        return this.commands[commandName]
    }

}