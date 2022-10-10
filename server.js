const path = require('path')
const multer = require('multer');
const bodyParser = require('body-parser');
const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const sharp = require('sharp');
function objMerge(x1, x2) {
    if (typeof x2 !== "object") return x1;
    let newj = {};
    for (let key in x1) {
        newj[key] = x1[key];
    }
    for (let key in x2) {
        newj[key] = x2[key];
    }
    return newj;
}
module.exports = function Server(folder, port) {
    const app = express();
    app.set('view engine', 'ejs')

    // render main.ejs page
    ejs.renderFile(path.join(folder, "./main.ejs"), {
        path,
        folder,
        createRoute(method, route, middleware, cb) {
            if (!cb) {cb = middleware; middleware = undefined};
            if (typeof cb === "string") {let str = cb; cb = r => r(str)};
            if (typeof middleware === "string" && typeof cb === "object") {
                let str = middleware;
                let opt = cb;
                cb = r => r(str, opt);
                middleware = undefined;
            }
            
            if (middleware)
                app[method](route, middleware, (req, res, next) => {
                    let defaultOpt = {req, res, next, eehpp: this};
                    cb((path, opt) => {
                        res.render(this.path.join(folder, path), objMerge(defaultOpt, opt))
                    }, req, res, next);
                })
            else;
                app[method](route, (req, res, next) => {
                    let defaultOpt = {req, res, next, eehpp: this};
                    cb((path, opt) => {
                        res.render(this.path.join(this.folder, path), objMerge(defaultOpt, opt))
                    }, req, res, next);
                });
        },
        createGETRoute(route, middleware, cb) {
            return this.createRoute('get', route, middleware, cb);
        },
        createPOSTRoute(route, middleware, cb) {
            return this.createRoute('post', route, middleware, cb);
        },
        resolvePath(path) {
            return this.path.join(folder, path);
        },
        create404Route(...args) { // NOTE: this must be added AFTER all the website's routes
            return this.createGETRoute("*", ...args);
        },
        createStaticRoute(route, path, resolvePath = true) {
            app.use(route, express.static(
                resolvePath ? this.resolvePath(path) : path
            ))
        },
        useJSONBodyParser() {
            app.use(this.bodyParser.json())
        },
        useURLEncodedBodyParser() {
            app.use(this.bodyParser.urlencoded({extended: false}))
        },
        assertPort(p) {
            if (port !== p) {
                throw new Error('This web app requires being runned at port '+p);
            }
        },
        bodyParser,
        multer,
        readfile(path) {
            return fs.readFileSync(this.resolvePath(path), {encoding: 'utf-8'});
        },
        readjson(path) {
            return JSON.parse(this.readfile(path));
        },
        useCookieParser() {
            app.use(cookieParser());
        },
        getenv(evar) {return process.env[evar]},
        fs,
        axios,
        sharp,
        __dirname,
	require
    })

    app.listen(port, () => {
        console.log('listening on port',port)
    })
}
