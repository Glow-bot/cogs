const {default:Collection} = require("@discordjs/collection")
const {join,resolve,parse} = require("path")
const {readdirSync} = require("fs")

const Cog = class extends Collection{
    /**
     * @type {Function|undefined}
     * the loader function
     */
    #loader
    /**
     * @type {Function|undefined}
     * the unloader function
     */
    #unloader
    /**
     * @type {String}
     * the String passed to the constructor
     */
    #main
    /**
     * @param {String} pathKey
     * @returns {{base:String,full:String}}
     * resolves a file path from a String
     */
    #resolve(pathKey){
        const path = {}
        path.full = resolve(this.#readpath(this.#main).find(a=>a.endsWith(pathKey)||a.endsWith(pathKey+".js")))
        if(!path.full.endsWith(".js"))path.full=path.full+".js"
        path.base = parse(path.full).base.slice(0,-3)
        return path
    }
    /**
     * @param {String} path
     * @returns {[String]}
     * gets all javascript files from path
     */
    #readpath(path){
        const dirs = []
        const files = []
        readdirSync(path,{withFileTypes:true}).map(v=>{
            if(v.isDirectory())dirs.push(join(path,v.name))
            if(v.isFile())files.push(join(path,v.name))
        })
        dirs.forEach(child=>files.push(...this.#readpath(child)))
        return files.filter(a=>a.match(/\.(|m|c)js$/))
    }
    /**
     * @constructor
     * @param {String} main the path¥
     * just creates a cog
     */
    constructor(main = "./"){
        super()
        this.#main = main
    }
    /**
     * @param {Function|undefined} loader the function
     * set the loader function(if nullish was provied, it will be reseted)
     * the loader function will be called everytime when a file was added
     */
    setLoader(loader){
        this.#loader = loader
        return this
    }
    /**
     * @param {Function|undefined} unloader
     * set the unloader function(if nullish was provied, it will be resetted)
     * the unloader function will be called everytime when a file was removed
     */
    setUnloader(unloader){
        this.#unloader = unloader
        return this
    }
    /**
     * @returns {String} the String passed to the constructor
     */
    get main(){
        return this.#main
    }
    /**
     * @param {String} name the name
     * load a single Cog
     */
    load(name){
        const path = this.#resolve(name)
        var module = require(path.full)
        module.name = path.base
        module.path = path.full
        if(this.#loader)module = this.#loader(module)
        this.set(module.name,module)
        return module
    }
    /**
     * @param {String} name the name
     * unload a single Cog
     */
    unload(name){
        const path = this.get(name)?.path || this.#resolve(name).full
        const module = this.find(a=>a.path===path)
        if(this.#unloader)module = this.#unloader(module)
        this.delete(module.name)
        delete require.cache[path]
        return module
    }
    /**
     * @param {String} name the name
     * reload a single Cog
     * shortcut for unload() and load()
     */
    reload(name){
        const {name:_name} = this.unload(name)
        return this.load(_name)
    }
    /**
     * Load all Cogs
     */
    loadAll(){
        const base = resolve(this.#main)
        this.#readpath(base).map(v=>this.load(v.slice(base.length)))
        return this
    }
    /**
     * Unload all Cogs
     */
    unloadAll(){
        this.map(a=>this.unload(a.name))
        return this
    }
    /**
     * Reload all Cogs
     * shortcut for unloadAll() and loadAll()
     */
    reloadAll(){
        this.unloadAll()
        return this.loadAll()
    }
}
module.exports = Cog
module.exports.Cog = Cog