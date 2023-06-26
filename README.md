# eehpp
php on steroids
### getting started
First, you must create a folder that'll host your eehpp website.
then create a `main.ejs` file.
that file will look something like this:
```ejs
<%
    createGETRoute('/', './funny.ejs', { data_variables_here: "lol" });
%>
```
You can also use `assertPort(number)` to make sure your server runs on a specific port.
on all pages a object named `eehpp` is present, that object has any functions present in the global
scope of main.ejs (for example: `eehpp.readjson("./amog.json")`), and also express's `req`uest and `res`ponse
### the eehpp object
The following properties are present in `eehpp` (or the global scope if you're on main.ejs):
- `eehpp.assertPort(number): void`
- `eehpp.useJSONBodyParser(): void`
- `eehpp.useURLEncodedBodyParser(): void`
- `eehpp.bodyParser` body-parser module
- `eehpp.multer` multer module
- `eehpp.readfile(path: string): string`
- `eehpp.useCookieParser(): void`
- `eehpp.getenv(string): string`
- `eehpp.fs` node fs
- `eehpp.axios` axios module
- `eehpp.sharp` sharp module
- `eehpp.__dirname` literally \_\_dirname
- `eehpp.require(...): any` node require
- `eehpp.path` path module
- `eehpp.folder` the folder main.ejs is on
- `eehpp.createRoute(method: string, route: string, middleware?: func, callback: func): void`
- `eehpp.createGETRoute(route: string, middleware?: func, callback: func): void`
- `eehpp.createPOSTRoute(route: string, middleware?: func, callback: func): void`
- `eehpp.create404Route(middleware?: func, callback: func): void`
- `eehpp.createStaticRoute(route: string, path: string, resolvePath: boolean = true): void`
- `eehpp.resolvePath(string): string`

