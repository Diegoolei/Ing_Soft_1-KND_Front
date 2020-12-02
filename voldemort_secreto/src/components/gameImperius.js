// import { useDispatch, useSelector } from 'react-redux'
// import { makeStyles } from '@material-ui/core/styles'
// import icons from '../metaMedia/icons/iconindex'
// import {
//   highlightImperiusOption,
//   confirmImperiusSelection,
//   resetImperius
// } from '../redux/reduxIndex'
// import { deactivateImperius } from '../redux/reduxIndex'
// import { makeImperiusUnavailable } from '../redux/game/activeApps/activeAppsActions'

// function Imperius() {
//   const dispatch = useDispatch()
//   const imperius_redux = useSelector(state => state.imperius)
//   const game = useSelector(state => state.game)
//   const amount_options = imperius_redux.options.length

//   const optionStyle = () => {
//     let style = {
//       root: {
//         "display": "inline-block",
//         "box-sizing": "border-box",
//         "border-radius": "5%",
//         "border": "none",
//         "padding": "1%",
//         "margin": "0%",
//         "width": `${100/amount_options}%`,
//       }
//     }
//     const stl = makeStyles(style)
//     return stl()
//   }

//   const styeclass = optionStyle()

//   function RenderOptions() {
//     let players_options = []
//     for (let i in imperius_redux.options) {
//       const nick = imperius_redux.options[i]
//       const icon_n = game.player_array[nick].icon
//       const src = icons[icon_n]
//       let buttonclassname
//       if(imperius_redux.highlighted_option !== i) {
//         buttonclassname = "Imperius-optionbutton" 
//       } else {
//         buttonclassname = "Imperius-highlightedoption" 
//       }
//       const option = (
//         <div className={styeclass.root} key={`imperius_option_${nick})`}>
//           <button className={buttonclassname} onClick={() => dispatch(highlightImperiusOption(i))}>
//           <img className="Imperius-img" src={src} alt={nick}/>
//           {nick}
//           </button>
//         </div>)
//       players_options.push(option)
//     }
//     return <div className="Imperius-options">{players_options}</div>
//   }

//   function confirm() {
//     const selected_option = imperius_redux.highlighted_option
//     if(selected_option !== -1) {
//       const nick = imperius_redux.options[selected_option]
//       const player_number = game.player_array[nick].player_number
//       dispatch(confirmImperiusSelection(player_number))
//     }
//   }

//   const ConfirmButton = () => {
//     let confirmButtonClassname
//     if (imperius_redux.highlighted_option !== -1) {
//       confirmButtonClassname = "Imperius-confirm"
//     } else {
//       confirmButtonClassname = "Imperius-confirm-grey"
//     }
//     return <button className={confirmButtonClassname} onClick={confirm}>Confirm</button>
//   }

//   function Reveal() {
//     const selected_option = imperius_redux.highlighted_option
//     const nick = imperius_redux.options[selected_option]
//     const icon_n = game.player_array[nick].icon
//     const src = icons[icon_n]

//     const roleString = (imperius_redux.role === 0) ? "from the Order of the Phoenix" : "a Death Eater"
//     return (
//       <div className="Imperius-revealcontainer">
//         <img className="Imperius-revealimg" src={src} alt={nick}/>
//         <br/>{nick} is {roleString}
//       </div>
//     )
//   }

//   function close() {
//     if (imperius_redux.role === null) {
//       dispatch(deactivateImperius())
//     } else {
//       dispatch(resetImperius())
//       dispatch(makeImperiusUnavailable())
//       dispatch(deactivateImperius())
//     }
//   }

//   return (
//     <div className="Popup-background">
//       <div className="Popup">
//         <div className="Imperius-rules">
//           Choose a player to set him as minister, you can choose anyone exept for you.
//           When Imperius turn ends (doesnt matter the reasson), the clockwise minister turn order will be set as before imperius was casted
//         </div>
//         {imperius_redux.role === null ? (<div className="Div-invisible">
//           <div className="Imperius-optionContainer"><RenderOptions/></div>
//           <ConfirmButton/>
//         </div>)
//          : <Reveal/>}
//         <button className="Button-Close" onClick={close}>X</button>
//       </div>
//     </div>
//   )
// }

// export default Imperius
