import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchProductList } from "../../actions";
import { STATUS } from "../../types/status";

import DropdownCheckbox from '../../components/DropdownCheckbox';

export class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: {
                delivery_time: [
                    '1 week',
                    '2 weeks'
                ],
                furniture_style: [
                ],
                name: ''
            },
            options: {
                delivery_time: [
                    '1 week',
                    '2 weeks',
                    '1 month',
                    'more'
                ],
                furniture_style: [
                    'Classic',
                    'Midcentury',
                    'Scandinavian',
                    'Modern',
                    'Contemporary'
                ]
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClickFurniture = this.handleClickFurniture.bind(this);
        this.handleChangeDeliverytime = this.handleChangeDeliverytime.bind(this);
    }

    componentDidMount() {
        const { query } = this.state;
        this.props.fetchProduct(query);
    }

    handleClickFurniture(val) {
        let styles = [...this.state.query.furniture_style];
        const idx = styles.indexOf(val);
        if (idx === -1) {
            styles.push(val)
        } else {
            styles.splice(idx, 1)
        }

        this.setState({ query: { furniture_style: styles } });
        const { fetchProduct } = this.props;
        fetchProduct(this.state.query);
    }

    handleChangeDeliverytime(val) {
        let times = [...this.state.query.delivery_time];

        const idx = times.indexOf(val);

        if (idx === -1)
            times.push(val)
        else
            times.splice(idx, 1)

        this.setState({ query: { delivery_time: times } })
        const { fetchProduct } = this.props;
        fetchProduct(this.state.query);
    }

    handleInputChange(e) {
        const value = e.target.value;
        this.setState((prevState) => {
            return {
                query: {
                    ...prevState.query,
                    name: value
                }
            }
        });

        const { fetchProduct } = this.props;

        fetchProduct(this.state.query);
    }

    render() {
        const MAX_LENGTH = 114
        const { products } = this.props;

        const data = products.products.data;
        const status = products.products.status;

        let output;

        if (status === STATUS.SUCCESS) {
            console.log('hallo')
            if (data) {
                output = (
                    <div className="product-wrapper">
                        {
                            data.map((product, i) => {
                                return (
                                    <div key={product.name} className="product-box">
                                        <div className="product-wrap">
                                            <div className="product-name-price">
                                                <div className="product-name">
                                                    {product.name}
                                                </div>
                                                <div className="product-price">
                                                    {`IDR ${(product.price).toLocaleString('en')}`}
                                                </div>
                                            </div>
                                            <div className="product-description">
                                                {
                                                    product.description.length > MAX_LENGTH ?
                                                        `${product.description.substring(0, MAX_LENGTH)}...`
                                                        : product.description
                                                }
                                            </div>
                                            <div className="product-style">
                                                <span>Furniture Styles</span><br />
                                                <span>{product.furniture_style.join(', ')}</span>
                                            </div>

                                            <div className="product-delivery">
                                                {`Delivery ${product.delivery_time} Days`}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            } else {
                output = <h3>Nothing found</h3>;
            }
        }

        return (
            <div className="container">
                <div className="header">
                    <div className="header-input">
                        <div className="header-input">
                            <input
                                className="header-input-text"
                                type='text'
                                name='name'
                                val={this.state.query.name}
                                onChange={this.handleInputChange}
                                placeholder="Search Furniture"
                            />
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <div style={{ display: 'inline-block', width: '49%', marginRight: 10, zIndex: 4 }}>
                                <DropdownCheckbox
                                    backgroundcolor="#fff"
                                    placeholder="Furniture Style"
                                    list={this.state.options.furniture_style}
                                    data={this.state.query.furniture_style}
                                    onHandleClick={this.handleClickFurniture}
                                />
                            </div>

                            <div style={{ display: 'inline-block', width: '49%', zIndex: 3 }}>
                                <DropdownCheckbox
                                    backgroundcolor="#fff"
                                    placeholder="Delivery Time"
                                    list={this.state.options.delivery_time}
                                    data={this.state.query.delivery_time}
                                    onHandleClick={this.handleChangeDeliverytime}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {output}
            </div>
        );
    }
}

Home.propTypes = {
    products: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    products: state.product
});

const mapDispatchToProps = dispatch => ({
    fetchProduct: (query) => dispatch(fetchProductList(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
