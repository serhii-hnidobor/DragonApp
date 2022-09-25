"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDIContainer = exports.importContainerModuleInstancesFromDirectories = void 0;
const inversify_1 = require("inversify");
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const importContainerModuleInstancesFromDirectories = (directories, formats = ['.js', '.ts']) => {
    const loadFileClasses = function (
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    exported, allLoaded) {
        if (exported instanceof inversify_1.ContainerModule) {
            allLoaded.syncModules.push(exported);
        }
        else if (exported instanceof inversify_1.AsyncContainerModule) {
            allLoaded.asyncModules.push(exported);
        }
        else if (exported instanceof Array) {
            exported.forEach((i) => loadFileClasses(i, allLoaded));
        }
        else if (exported instanceof Object || typeof exported === 'object') {
            Object.keys(exported || {}).forEach((key) => loadFileClasses(exported[key], allLoaded));
        }
        return allLoaded;
    };
    const allFiles = directories.reduce((allDirs, dir) => allDirs.concat(glob_1.default.sync(path_1.default.normalize(dir))), []);
    const dirs = allFiles
        .filter((file) => formats.indexOf(path_1.default.extname(file)) !== -1 && file.substring(file.length - 5, file.length) !== '.d.ts')
        .map((file) => require(file));
    return loadFileClasses(dirs, { syncModules: [], asyncModules: [] });
};
exports.importContainerModuleInstancesFromDirectories = importContainerModuleInstancesFromDirectories;
const createDIContainer = async (containerModulesDirs) => {
    const container = new inversify_1.Container({ defaultScope: 'Singleton', skipBaseClassChecks: true });
    const { syncModules, asyncModules } = (0, exports.importContainerModuleInstancesFromDirectories)(containerModulesDirs);
    await container.loadAsync(...asyncModules);
    container.load(...syncModules);
    return container;
};
exports.createDIContainer = createDIContainer;
