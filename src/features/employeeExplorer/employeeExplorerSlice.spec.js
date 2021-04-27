import employeeExplorerReducer, {
    setName,
} from './employeeExplorerSlice';

describe('employeeExplorer reducer', () => {
    const initialState = {
        status: 'idle',
        name: '',
        employees: {},
    };
    it('should handle initial state', () => {
        expect(employeeExplorerReducer(undefined, { type: 'unknown' })).toEqual({
            status: 'idle',
            name: '',
            employees: {},
        });
    });

    it('should handle setName', () => {
        expect(employeeExplorerReducer(initialState, setName('test'))).toEqual({
            status: 'idle',
            name: 'test',
            employees: {},
        });
    });
});
