import { useGameContext } from '@providers/GameContextProvider';


const useHelpers = () => {
    const { state } = useGameContext();

    const isAvailable = (col: number): boolean => {
        return state.board[col].includes(null);
    }

    const getNextRow = (col: number): number => {
        return state.board[col].indexOf(null);
    }

    return {
        isAvailable,
        getNextRow
    }
}

export default useHelpers;