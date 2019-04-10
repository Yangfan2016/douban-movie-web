import React from "react";

class Detail extends React.Component {
    render() {
        let {params}=(this.props as any).match;
        return (
            <div>Detail page {params.id}</div>
        );
    }
}

export default Detail;