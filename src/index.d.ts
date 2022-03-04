/**
 * It is a commonjs module
 */
export type LoadedModule = any;
export type nullish = null | undefined | 0;
declare module "@glowbot/cogs" {
    export class Cog{
        constructor(main: string);
        setLoader(loader: Function | nullish): this;
        setUnloader(loader: Function | nullish): this;
        load(name: string): LoadedModule;
        unload(name: string): LoadedModule;
        reload(name: string): LoadedModule;
        loadAll(): this;
        unloadAll(): this;
        reloadAll(): this;
    }
}