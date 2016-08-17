import React, {Component} from 'react';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router';
import './style.less';
import FAIcon from '../faicon/FAIcon';

class PageHeader extends Component {
    static defaultProps = {
        title: '',
        breadcrumb: [],
        hidden: false,
    }
    static propsType = {
        title: React.PropTypes.string,
        breadcrumb: React.PropTypes.array,
        hidden: React.PropTypes.bool,
    }

    renderBreadcrumb = () => {
        const {breadcrumb} = this.props;
        if (breadcrumb && breadcrumb.length) {
            const home = (
                <Breadcrumb.Item key="home">
                    <Link to="/">
                        <span>
                            <FAIcon className="breadcrumb-icon" type="fa-home"/>
                            <span className="breadcrumb-text">首页</span>
                        </span>
                    </Link>
                </Breadcrumb.Item>
            );

            let breadcrumbJsx = breadcrumb.map((bread, index) => {
                let itemContent = (
                    <span>
                        <FAIcon className="breadcrumb-icon" type={bread.icon}/>
                        <span className="breadcrumb-text">{bread.text}</span>
                    </span>
                );
                if (bread.path) {
                    itemContent = (
                        <Link to={bread.path}>
                            {itemContent}
                        </Link>
                    );
                }
                return (
                    <Breadcrumb.Item key={index}>
                        {itemContent}
                    </Breadcrumb.Item>
                );
            });

            breadcrumbJsx.unshift(home);

            return (
                <Breadcrumb>
                    {breadcrumbJsx}
                </Breadcrumb>
            );
        }
        return null;
    }

    render() {
        const {title, hidden} = this.props;
        return (
            <div className={`page-header ${hidden ? 'hidden' : ''}`}>
                <h2 className="header-title">{title}</h2>
                {this.renderBreadcrumb()}
            </div>
        );
    }
}
export default PageHeader;
