/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

import React from 'react';
import PropTypes from 'prop-types';
import {getValidationState} from '../../utils/sciadro';
import {Form, FormGroup, FormControl, ControlLabel, Col} from 'react-bootstrap';
import BorderLayout from '@mapstore/components/layout/BorderLayout';
import Message from '@mapstore/components/I18N/Message';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);

require('react-widgets/lib/less/react-widgets.less');
import {DateTimePicker} from 'react-widgets';
/**
 * Asset Edit
 * @class
 * @memberof components.AssetEdit
*/
class AssetEdit extends React.Component {
    static propTypes = {
        assets: PropTypes.array,
        typeList: PropTypes.array,
        assetEdited: PropTypes.object,
        assetNew: PropTypes.object,
        className: PropTypes.string,
        onEditAsset: PropTypes.func
    };
    static contextTypes = {
        messages: PropTypes.object
    };
    static defaultProps = {
        assets: [],
        typeList: [
            { value: "powerline", label: "sciadro.assets.powerline" },
            { value: "pipeline", label: "sciadro.assets.pipeline" },
            { value: "electric-truss", label: "sciadro.assets.electric-truss" }
        ],
        className: "",
        onEditAsset: () => {}
    };

    render() {
        const {assetNew, assetEdited} = this.props;
        const asset = assetEdited || assetNew || {};

        return (
            <BorderLayout
                className="padding15" >
                <Form horizontal>
                    <FormGroup>
                        <Col xs={12} sm={12} md={12}>
                            <ControlLabel><Message msgId="sciadro.mandatory"/></ControlLabel>
                        </Col>
                    </FormGroup>
                    <FormGroup validationState={getValidationState(asset.type)}>
                        <Col xs={12} sm={12} md={12}>
                            <ControlLabel><Message msgId="sciadro.assets.type"/> *</ControlLabel>
                            <FormControl
                                componentClass="select"
                                placeholder="..."
                                onChange={(e) => this.props.onEditAsset(asset.id, "type", e.target.value)}
                                value={asset.type}
                                >
                                    {this.props.typeList.map((t, i) => (
                                        <option key={i} value={t.value}><Message msgId={t.label}/></option>
                                    ))}
                            </FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup validationState={getValidationState(asset.name)}>
                        <Col xs={12} sm={12} md={12}>
                            <ControlLabel><Message msgId="sciadro.assets.name"/> *</ControlLabel>
                            <FormControl
                                value={asset.name}
                                onChange={(e) => this.props.onEditAsset(asset.id, "name", e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col xs={12} sm={12} md={12}>
                            <ControlLabel><Message msgId="sciadro.assets.description"/></ControlLabel>
                            <FormControl
                                value={asset.description}
                                onChange={(e) => this.props.onEditAsset(asset.id, "description", e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col xs={12} sm={12} md={12}>
                            <ControlLabel><Message msgId="sciadro.assets.note"/></ControlLabel>
                            <FormControl
                                value={asset.note}
                                onChange={(e) => this.props.onEditAsset(asset.id, "note", e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup validationState={getValidationState(asset.dateCreation)}>
                        <Col xs={12} sm={12} md={12}>
                            <ControlLabel><Message msgId="sciadro.assets.dateCreation"/> *</ControlLabel>
                            <DateTimePicker
                                time
                                calendar
                                format="L"
                                value={asset.dateCreation}
                                onChange={(date) => this.props.onEditAsset(asset.id, "dateCreation", date)}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col xs={12} sm={12} md={12}>
                            <ControlLabel><Message msgId="sciadro.assets.dateModified"/></ControlLabel>
                                <DateTimePicker
                                    time
                                    calendar
                                    format="L"
                                    value={asset.dateModified}
                                    onChange={(date) => this.props.onEditAsset(asset.id, "dateModified", date)}
                                />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col xs={12} sm={12} md={12}>
                            <ControlLabel><Message msgId="sciadro.assets.geometry"/></ControlLabel>
                            <br/>
                            <img src="/assets/images/upload_geom.png"/>
                        </Col>
                    </FormGroup>
                </Form>
            </BorderLayout>
        );
    }
}

export default AssetEdit;
