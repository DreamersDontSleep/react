import React, {  useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd';

import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import './index.less'
// import memoryUtils from "../../utils/memoryUtils";



// /*
// withRouter高阶组件:
// 包装非路由组件, 返回一个新的组件
// 新的组件向非路由组件传递3个属性: history/location/match
//  */

function LeftNav() {

    let [menuNodes, setMenuNodes] = useState([])
    let [openKey, setOpenKey] = useState('')
    let path = window.location.pathname
    const SubMenu = Menu.SubMenu;
    // console.log(path)
    // console.log(menuList)

    /*
//   判断当前登陆用户对item是否有权限
//    */
    const hasAuth = (item) => {
        // const { key, isPublic } = item

        // const menus = memoryUtils.user.role.menus
        // const menus = 'admin'
        // const username = memoryUtils.user.username
        const username = 'admin'
        /*
        1. 如果当前用户是admin
        2. 如果当前item是公开的
        3. 当前用户有此item的权限: key有没有menus中
         */
        // if(username==='admin' || isPublic || menus.indexOf(key)!==-1) {
        if (username === 'admin') {
            return true
        } else if (item.children) { // 4. 如果当前用户有此item的某个子item的权限
            //   return !!item.children.find(child =>  menus.indexOf(child.key)!==-1)
            return true
        }

        return false
    }

    /*
//   根据menu的数据数组生成对应的标签数组
//   使用reduce() + 递归调用
//   */
    const getMenuNodes = (menuList) => {
        // 得到当前请求的路由路径
        // const path = this.props.location.pathname

        return menuList.reduce((pre, item) => {

            // 如果当前用户有item对应的权限, 才需要显示对应的菜单项
            if (hasAuth(item)) {
                // 向pre添加<Menu.Item>
                if (!item.children) {
                    pre.push((
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    ))
                } else {

                    // 查找一个与当前请求路径匹配的子Item
                    const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                    // const cItem = true
                    // 如果存在, 说明当前item的子列表需要打开
                    if (cItem) {
                        openKey = item.key
                    }


                    // 向pre添加<SubMenu>
                    pre.push((
                        <SubMenu
                            key={item.key}
                            title={
                                <span>
                                    <Icon type={item.icon} />
                                    <span>{item.title}</span>
                                </span>
                            }
                        >
                            {getMenuNodes(item.children)}
                        </SubMenu>
                    ))
                }
            }
            // console.log(pre)
            return pre
        }, [])
    }

    // 生命周期 - 首次加载组件时触发
    useEffect(() => {
        menuNodes = getMenuNodes(menuList)
        // console.log(menuNodes)
    },[]);



    return (
        <div className="left-nav">
            <Link to='/' className="left-nav-header">
                <img src={logo} alt="logo" />
                <h1>react-admin</h1>
            </Link>
            <Menu
                mode="inline"
                theme="dark"
                selectedKeys={[path]}
                defaultSelectedKeys={[path]}
                defaultOpenKeys = {[path]}
            >

                {
                    getMenuNodes(menuList)
                }
            </Menu>
        </div>
    )
}

export default withRouter(LeftNav)