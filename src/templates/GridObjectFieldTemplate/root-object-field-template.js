import React from "react";
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

const DEFAULT_COLS = { lg: 36, md: 36, sm: 36, xs: 36, xxs: 36 };
const DEFAULT_BREAKPOINTS = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };

class RootObjectFieldTemplate extends React.Component {
  state = {
    breakpoint: null,
    row: null,
  }

  grid = React.createRef();

  componentDidMount() {
    this.grid.forceUpdate();
    this.setState({ loading: true });
    process.nextTick(() => {
      this.setState({ loading: false });
    })
  }

  handleLayoutChange = (props) => {
    console.log(props);
  }

  handleBreakpointChange = (breakpoint, row) => {
    if (this.state.breakpoint === breakpoint) {
      return;
    }

    this.grid.forceUpdate();
    this.setState({ breakpoint, row, loading: true });
    process.nextTick(() => {
      this.setState({ loading: false });
    })
  }

  renderChild = (childProp) => {
    const gridLayout = childProp.content.props.uiSchema.layout;
    let responsiveGridLayout = _.omit(gridLayout, ['sm', 'md', 'lg']);

    if (this.state.breakpoint) {
      const breakpointGridLayout = _.get(gridLayout, this.state.breakpoint);
      responsiveGridLayout = breakpointGridLayout || responsiveGridLayout;
    }

    return <div key={childProp.name} data-grid={responsiveGridLayout}>
      {childProp.content}
    </div>;
  }

  renderGridLayout() {
    const props = this.props;
    const cols = _.get(props, 'uiSchema.ui:options.cols');
    const breakpoints = _.get(props, 'uiSchema.ui:options.breakpoints');
    return (
      <ResponsiveGridLayout
        ref={(grid) => {this.grid = grid }}
        layout="layout"
        breakpoints={_.isObject(breakpoints) ? breakpoints : DEFAULT_BREAKPOINTS}
        cols={_.isObject(cols) ? cols : DEFAULT_COLS}
        autoSize
        onBreakpointChange={this.handleBreakpointChange}
        onLayoutChange={this.handleLayoutChange}
        rowHeight={150}
        isResizable={false}
        isDraggable={false}
      >
        {props.properties.map(childProp => this.renderChild(childProp))}
      </ResponsiveGridLayout>
    );
  }

  render() {
    return <>
      {!this.state.loading && this.renderGridLayout()}
    </>
  }
}

export default RootObjectFieldTemplate;