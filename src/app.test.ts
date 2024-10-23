import { ServerApp } from './presentation/server-app';
describe('Test App.ts', () => {

    test('should call Server.run with values', async () => {

        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;
        process.argv = ['node', 'app.ts', '-b', '5', '-l', '5', '-s', '-n', 'test-file', '-d', 'test'];

        // Estimulo
        await import('./app');

        // aserción
        expect(serverRunMock).toHaveBeenCalledWith({base: 5,
            limit: 5,
            showTable: true,
            fileName: 'test-file',
            fileDestination: 'test'
        });
    
    });

});