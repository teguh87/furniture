import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'


class DropdownCheckbox extends React.PureComponent {
    state = {
        showList: false
      }
    
      handleClick = (e) => {
        return this.setState({ 
          showList: !this.state.showList
        }) 
         
      }
    
      render() {
        const { label, backgroundcolor, placeholder, width, list, data, onHandleClick } = this.props
        const { showList } = this.state
    
        return (
          <div 
            style={{ 
              position: 'relative', 
              width: width ? width : null,
              padding: '5px 10px',
              cursor: 'pointer',
              backgroundColor: backgroundcolor ? backgroundcolor : null,
            }}
            onClick={this.handleClick}
          >
            { label ? label : null }
    
            <div style={{ display: 'flex' }}>
              <div style={{ flex: '1' }}>
                { placeholder ? placeholder : null }
              </div>
              <div>
                {
                  !showList ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleUp} />
                }
              </div>
            </div>
    
            {
              showList && 
              <div style={{ position: 'absolute', left: 0, right: 0, top: 35, boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
                <DropdownCheck backgroundcolor={backgroundcolor} list={list} data={data} onHandleClick={onHandleClick} />
              </div>
            }
            
          </div>
        )
      }
}

class DropdownCheck extends React.Component {
    render() {
      const { backgroundcolor, list, data, onHandleClick } = this.props
      console.log(data);
      return (
        <div style={{ backgroundColor: backgroundcolor ? backgroundcolor : '#fff' }}>
          {
            list.map( (item, i) => {
              return (
                <div 
                  key={i} 
                  style={{ display: 'flex', padding: '10px 10px', cursor: 'default' }} 
                  onClick={ (e) => {
                    e.stopPropagation()
                    // this.props.onHandleClick(item) 
                  }}
                >
                  <div style={{ flex: 1, cursor: 'default' }} onClick={ (e) => e.stopPropagation() }>
                    {item}
                  </div>
                  <input 
                    type='checkbox' 
                    name={item}
                    checked={data.includes(item) ? true : false}
                    onChange={ (e) => {
                      e.stopPropagation()
                      onHandleClick(item)
                    }} 
                    style={{ width: 20, height: 20, cursor: 'pointer' }}
                  />
                </div>
              )
            })
          }
        </div>
      )
    }
  }
  
  export default DropdownCheckbox