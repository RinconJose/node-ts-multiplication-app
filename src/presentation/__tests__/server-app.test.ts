import { Server } from 'http';
import { CreateTable } from '../../domain/use-cases/create-table.use-case';
import { SaveFile } from '../../domain/use-cases/save-file.use-case';
import { ServerApp } from '../server-app';


describe('Server App', () => {

    const options = {
        base: 5,
        limit: 10,
        showTable: false,
        fileName: 'test-filename',
        fileDestination: 'test-destination'
    }

    beforeEach(() => {
        jest.clearAllMocks();
    })


    test('should create ServerApp instance', () => {

        const serverApp = new ServerApp();

        // Acersiones
        // Validando que serverApp sea una instancia de ServerApp
        expect( serverApp ).toBeInstanceOf(ServerApp);

        // Validando que ServerApp es una función
        expect( typeof ServerApp.run ).toBe('function')

    })

    test('should run ServerApp with options', () => {

        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn( SaveFile.prototype, 'execute' );

        ServerApp.run(options);

        expect( logSpy ).toHaveBeenCalledTimes(2);
        expect( logSpy ).toHaveBeenCalledWith('Server running...');
        expect( logSpy ).toHaveBeenCalledWith('Table was created successfully');

        expect( createTableSpy ).toHaveBeenCalledTimes(1);
        expect( createTableSpy ).toHaveBeenCalledWith({ base: options.base, limit: options.limit });

        expect( saveFileSpy ).toHaveBeenCalledTimes(1);
        expect( saveFileSpy ).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName
        });

    })

    test('should run with custom values mocked', () => {

        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        expect( logMock ).toHaveBeenCalledWith("Server running...");
        expect( createMock ).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
        expect( saveFileMock ).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName
        });
        expect( logMock ).toHaveBeenCalledWith('Table was created successfully');
        expect( logErrorMock ).not.toHaveBeenCalled();
    })

})


// Puedes simular el resultando del jes.fn() con el método mockReturnValue() para que cuando se llame a la función, retorne el valor que le indiques.