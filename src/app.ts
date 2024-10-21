import { yarg } from './config/plugins/yargs.plugin';
import { ServerApp } from './presentation/server-app';

// console.log(process.argv);

// console.log(yarg.b);

// Función anonima autoinvicada
(async() => {
    await main();
})();

async function main() {

    const {b:base, l:limit, s:showTable, n:fileName, d:fileDestination} = yarg;
    
    ServerApp.run({base, limit, showTable, fileName, fileDestination});

}
