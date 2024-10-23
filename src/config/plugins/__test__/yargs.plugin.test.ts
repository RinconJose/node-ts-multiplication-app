// import { yarg } from '../yargs.plugin';

// Esto sirve cuando uno quiere hacer pruebas por consola
const runCommand = async (args: string[]) => {
    process.argv = [ ...process.argv, ...args ]
    const { yarg } = await import('../yargs.plugin');
    return yarg;
}

describe('Test yargs.plugin', () => {

    const originalArgv = process.argv;
    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })

    test('should return default values', async() => {

        // Estímulo
        const argv = await runCommand(['-b', '5']);
        // console.log(argv);

        // Acersiones
        expect( argv ).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs'
        }));
        
    })

    test('should return configuration with custom values', async() => {

        // Estímulo
        const argv = await runCommand(['-b', '5', '-l', '20', '-s', '-n', 'custom-name', '-d', 'custom-outputs']);

        // Acersiones
        expect( argv ).toEqual(expect.objectContaining({
            b: 5,
            l: 20,
            s: true,
            n: 'custom-name',
            d: 'custom-outputs'
        }))

    })


})



// Explicación
// expect( argv ).toEqual(expect.objectContaining({
//     b: 5,
//     l: 10,
//     s: false,
//     n: 'multiplication-table',
//     d: 'outputs'
// }));
// Se utiliza este código para revisar que el objeto tenga las propiedades que se están esperando, en este caso, que tenga las propiedades b, l, s, n y d con los valores que se están esperando.
