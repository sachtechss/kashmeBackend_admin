import React from 'react';
import Sidebar from "react-sidebar";
const mql = window.matchMedia(`(min-width: 800px)`);

class Sidebaar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarDocked: mql.matches,
            sidebarOpen: true
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    }
    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
    }

    componentWillUnmount() {
        mql.removeListener(this.mediaQueryChanged);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    mediaQueryChanged() {
        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    }
    render() {
        return (<aside className='aside'>
            <Sidebar
                sidebar={[<div><a key={1} href="#" >
                    Mock menu item 1</a></div>,
                <div><a key={2} href="#" >
                    Mock menu item 2
            </a>
                </div>]}
                open={this.state.sidebarOpen}
                docked={false}
                onSetOpen={this.onSetSidebarOpen}
                shadow={false}
                styles={{ sidebar: { background: "white" } }}
            >
                <button onClick={() => this.onSetSidebarOpen(true)}>
                    Open sidebar
        </button>
            </Sidebar>
        </aside>);
    }
}

export default Sidebaar;
