/**
 * It is a commonjs module
 */
type LoadedModule = any;
declare module "@glowbot/cogs" {
    export class Cog{
        constructor(main:string);
        setLoader(loader:Function):this;
        setUnloader(loader:Function):this;
        load(name:string):LoadedModule;
        unload(name:string):LoadedModule;
        reload(name:string):LoadedModule;
        loadAll():this;
        unloadAll():this;
        reloadAll():this;
    }
}