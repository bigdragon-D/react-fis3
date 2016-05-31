'use strict';

import "./input.less";
import "../common/errtips.less";
import React,{ PropTypes } from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";
import {checkMail,checkPhone,checkPwd,checkEmpty} from "../Utils/valid";
import {afterErrTips} from "../Utils/errTips";
import {addClass,removeClass} from "../Utils/dom";
import {setTipsByType} from "../Utils/lang";
class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value,
			isValid: this.props.isValid,
			isChanged:this.props.isChanged
		}
	}
	componentWillReceiveProps (nextProps){
		if(nextProps.value !== this.state.value) {
			this.setValue(nextProps.value);
		}
	}

	setValue(value){
		this.setState({value})
	}
	getValue(){
		return this.state.value
	}

	/**
	 * 是否是必填项
	 */
	isRequired(ele){
		if(ele.value.trim().length === 0){
			this.showErrTips(ele,'required')
			setTipsByType('required','index',0);
		}else{
			setTipsByType('required','index',1);
		}
	}

	/**
	 * 显示、创建 错误提示，并将输入框变红
	 */
	showErrTips(ele,type){
		afterErrTips(ele,type);
		addClass(ele,'input_warning');
	}

	/**
	 * 隐藏错误提示，并将输入框重置
	 */
	hideErrTips(ele){
		let nextEle = ele.nextElementSibling;
		if(nextEle && nextEle.className == 'error_tips'){
			nextEle.style.maxHeight = '0';
			removeClass(ele,'input_warning')
		}
	}

	/**
	 * 验证 type 为 mail，phone，password等输入框，并显示相应错误提示
	 */
	validation(ele){
		let type = this.props.type,_value = ele.value.trim();
		switch (type) {
			case 'username':
				checkEmpty(_value) || this.showErrTips(ele,'noUsername');
				break;
			case 'mail':
				(checkEmpty(_value) || this.showErrTips(ele,'noMail')) && (checkMail(_value) || this.showErrTips(ele,'isMail'));
				break;
			case 'phone':
				(checkEmpty(_value) || this.showErrTips(ele,'noPhone')) && (checkPhone(_value) || this.showErrTips(ele,'isPhone'));
				break;
			case 'password':
				(checkEmpty(_value) || this.showErrTips(ele,'noPwd')) && (checkPwd(_value)  || this.showErrTips(ele,'isPwd'));
				break;
		}
	}

	handleBlur(e,props){
		let _ele = e.currentTarget;
		if(this.state.isChanged){
			this.props.required && this.isRequired(_ele);
			this.props.isValid && this.validation(_ele);
		}
	}

	handleFocus(e){
		let _ele = e.currentTarget;
		this.hideErrTips(_ele);
		e.stopPropagation();
	}

	handleChange(e){
		e.target.value.length >0 ? this.setState({isChanged:true}):'';
		this.setState({value:e.target.value})
	}

	render(){
		let className = classnames(this.props.className,'input_item');
		let {style,required,...others} = this.props;
		return (
			<label style={this.props.style} className ={className}>
				{this.props.text?<span className='input_label'>{this.props.text}</span>:''}
				<input {...others}
					className='input'
					onBlur= {this.handleBlur.bind(this)}
					onFocus= {this.handleFocus.bind(this)}
					onChange = {this.handleChange.bind(this)}
				/>
				{this.props.icon?<Icon icon={this.props.icon}/>:''}
				{this.props.children}
			</label>
		)
	}
}
Input.propTypes = {
	style:PropTypes.object,
	type:PropTypes.string,
	required:PropTypes.bool,
	className:PropTypes.string,
	text:PropTypes.string,
	placeholder:PropTypes.string,
	isValid:PropTypes.bool,
	icon:PropTypes.string,
	children:PropTypes.any,
	onBlur:PropTypes.func,
	onFocus:PropTypes.func,
	onChange:PropTypes.func

}
/**
 * 默认所有值都是未改变的
 */
Input.defaultProps = {
	isChanged:false
}


export { Input as default};
