"use strict";
var chalk = require("chalk");
var path = require("path");
var fs = require("fs");
var Command = require("commander").Command;
var shell = require("shelljs");
var config = require("./commands/config").config;
var create = require("./commands/new");
var deploy = require("./commands/deploy").deploy;
var connect = require("./commands/connect").connect;
var init = require("./commands/init").initialize;
var repo = require("./commands/repo").repo;
var develop = require("./commands/develop").develop;
var test = require("./commands/test").test;
var version = require("./../package.json").version;
var createProgram = function () {
    var program = new Command();
    program.version(version);
    program
        .command("new [project]")
        .alias("n")
        .description("Start new project from template")
        .action(function (project) {
        console.log(project);
        create.newProject(project);
    });
    program
        .command("deploy")
        .alias("d")
        .description('Deploy project as prescribed in package.json > "mintbean" predeploy and deploy scripts.')
        .action(function () {
        deploy();
    });
    program
        .command("init")
        .description("Alias for 'git init'.")
        .action(function (v) {
        init();
    });
    program
        .command("repo")
        .alias("r")
        .option("-c, --connect", "Set project's remote origin to new repo")
        .option("-p, --push", "(recommended) Intial add/commit/push of master to new repo")
        .description("Create GitHub remote repo with project name (RUN FROM PROJECT ROOT))")
        .action(function (cmdObj) {
        repo(cmdObj);
    });
    program
        .command("connect")
        .alias("c")
        .description("Add or override remote origin with github preferences in config")
        .action(function () {
        connect();
    });
    program
        .command("config")
        .description("Set up or view config (Github credentials etc.)")
        .option("-v, --view", "view current config")
        .option("-g, --github <username>", "set github username")
        .option("-t, --token <token>", "set github personal access token")
        .option("-S, --ssh", "set github connection type to ssh")
        .option("-H, --https", "set github connection type to https")
        .action(function (cmdObj) {
        config(cmdObj);
    });
    program
        .command("develop")
        .alias("dev")
        .description("Start development server to test out your project")
        .action(function () {
        develop();
    });
    program
        .command("test")
        .description("[For dev use only]")
        .action(function () {
        test();
    });
    return program;
};
module.exports = {
    createProgram: createProgram
};