/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Page from '@mapstore/containers/Page';
import {loadMapConfig} from '@mapstore/actions/config';


class SciadroPage extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        mode: PropTypes.string,
        geoStoreUrl: PropTypes.string,
        loadMapConfig: PropTypes.func,
        match: PropTypes.object,
        plugins: PropTypes.object,
        pluginsConfig: PropTypes.object
    }
    static contextTypes = {
        router: PropTypes.object
    }
    static defaultProps = {
        name: "sciadro",
        mode: 'desktop',
        match: {},
        pluginsConfig: {}
    }
    componentWillMount() {
        this.props.loadMapConfig("config.json", null);
    }

    render() {
        let plugins = this.props.pluginsConfig;
        let pluginsConfig = {
            "desktop": plugins[this.props.name] || [],
            "mobile": plugins[this.props.name] || []
        };

        return (<Page
            id="sciadro"
            pluginsConfig={pluginsConfig}
            plugins={this.props.plugins}
            params={this.props.match.params}
            />);
    }
}

module.exports = connect((state) => {
    return {
        mode: 'desktop',
        geoStoreUrl: (state.localConfig && state.localConfig.geoStoreUrl) || null,
        pluginsConfig: (state.localConfig && state.localConfig.plugins) || null
    };
}, {
    loadMapConfig
})(SciadroPage);
