import { createContext, useState, useEffect, useMemo, useContext, ReactNode } from 'react';

interface IUnitContext {
    units: any;
}

interface IUnitContextProvider {
    children: ReactNode,
    value: any,
}

const UnitContext = createContext<IUnitContext | undefined>(undefined);

function UnitContextProvider(props: IUnitContextProvider) {
    const { children, value } = props;

    const [units, setUnits] = useState({
        xl: '32px',  //960 -> 32
        l: '16px',   //960 -> 16
        m: '8px',   //960 -> 8
        s: '4px',   //960 -> 4
        xs: '2px',  //960 -> 2
    })

    const getUnits = () => {
        const width = value.offsetWidth;

        return {
            xl: `${width / 30}px`,
            l: `${width / 60}px`,
            m: `${width / 100}px`,
            s: `${width / 180}px`,
            xs: `${width / 240}px`,
        };
    };

    useEffect(() => {
        const handleResize = () => {
            setUnits(getUnits());
        };


        if (value) {
            setUnits(getUnits())
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [value]);

    const contextValue = useMemo(() => ({
        units,
    }), [units]);

    return (
        <UnitContext.Provider value={contextValue}>
            {children}
        </UnitContext.Provider>
    );
}

function useUnitContext() {
    const context = useContext(UnitContext);

    if (context === undefined) {
        throw new Error("UnitContext was used outside of it's provider");
    }

    return context;
}

export {
    UnitContext,
    UnitContextProvider,
    useUnitContext,
}