import * as React from 'react';
import { Router, useRouter } from 'next/router';
import styled, { ThemeProvider } from 'styled-components';
import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group';
import {Provider} from 'react-redux';
import Theme from '../../styles/theme'
import store from '../../store';

const TIME_OUT = 200;
const getTransitionStyles = {
    entering: {
        opacity: 1,
        transition: `opacity ${TIME_OUT}ms ease-in-out, transform ${TIME_OUT}ms ease-in-out`,
        // position: "absolute",
    },
    entered: {
        transition: `opacity ${TIME_OUT}ms ease-in-out, transform ${TIME_OUT}ms ease-in-out`,
        opacity: 1,
    },
    exiting: {
        transition: `opacity ${TIME_OUT}ms ease-in-out, transform ${TIME_OUT}ms ease-in-out`,
        opacity: 0,
    },
    exited: {
        opacity: 0,
        transition: `opacity ${TIME_OUT}ms ease-in-out, transform ${TIME_OUT}ms ease-in-out`,
    },
    unmounted: {
        
    },
};

interface Props {
}

const Layout = ({ children }: React.PropsWithChildren<Props>) => {
    const router = useRouter();
    return (
        <Provider store={store}>
            <ThemeProvider theme={Theme}>
                <TransitionGroup className={"transition-wrap"}>
                    <ReactTransition timeout={TIME_OUT} key={router.pathname}>
                        {(status) => (
                            <main
                                className='main'
                                style={{
                                    ...getTransitionStyles[status],
                                }}
                            >
                                {children}
                            </main>
                        )}
                    </ReactTransition>
                </TransitionGroup>
                {/* {children} */}
            </ThemeProvider>
        </Provider>
    )
};

export default Layout;
