import{j as e,t as r,B as i,u as v,a as p,b as y,r as n,m as b,n as j,o as f}from"./index-ChT_ZIC7.js";import{S as N}from"./SettingsHeader-j2rldDET.js";import{S as k}from"./SettingsInput-BYHTNiKU.js";import{M as T}from"./Modal-axEZC8xA.js";import{o as w}from"./openModal-C62Avi1l.js";const S=({id:s,label:l,onChange:t,accept:o})=>e.jsxs("div",{children:[e.jsx("label",{className:"border-2 border-typography-light dark:border-typography-dark rounded-md hover:bg-typography-light hover:text-typography-dark transition-colors duration-150 dark:hover:bg-typography-dark dark:hover:text-typography-light inline-block px-4 py-1",htmlFor:s,children:l}),e.jsx("input",{accept:o,onChange:t,className:"hidden",type:"file",id:s})]}),C=({onDelete:s})=>e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsxs("div",{className:"grid gap-2 place-items-center",children:[e.jsx("h2",{className:"text-3xl",children:r("areYouSure")}),e.jsxs("p",{className:"text-lg",children:[r("irreversible")," "]})]}),e.jsx(i,{onClick:s,className:"mt-8 border-2 text-danger border-danger px-4 py-1 rounded-lg hover:rounded-md hover:bg-danger hover:text-typography-dark transition-colors duration-150",children:r("delete")})]}),U=()=>{const s=v(),l=p(a=>a.auth.user),{currentTeam:t}=p(a=>a.teamManagement),o=y(),d=n.useRef(null),[m,c]=n.useState(t?.name),h=a=>{c(a.target.value)};n.useEffect(()=>{c(t?.name)},[t]);const g=()=>{s(b({currentTeam:l?.currentSelectedTeam,newTeamName:m})),o(0)},x=a=>{s(j({teamID:l?.currentSelectedTeam,file:a.target.files[0]}))},u=()=>{s(f(l?.currentSelectedTeam)),d.current?.close()};return e.jsxs("div",{className:"p-4",children:[e.jsx(N,{children:r("teamSettings")}),e.jsxs("div",{className:"flex justify-between w-full max-w-[90%] max-md:flex-col max-lg:items-start max-lg:gap-8",children:[e.jsxs("div",{className:"flex gap-2 flex-col items-start",children:[e.jsx(k,{value:m,onChange:a=>h(a),id:"teamName",type:"text",label:r("teamName")}),e.jsx(i,{className:"mt-4 border-2 border-typography-light dark:border-typography-dark px-2 py-1 rounded-md hover:bg-bg-dark dark:hover:bg-bg-light dark:hover:text-typography-light hover:text-typography-dark transition-colors duration-150",onClick:g,children:r("change")})]}),e.jsxs("div",{className:"flex flex-col gap-2 items-center",children:[e.jsx("h3",{children:r("teamLogo")}),e.jsx("div",{className:" w-full min-w-[160px] aspect-square [&>*]:rounded-md",children:t?.logo?e.jsx("img",{src:t?.logo,alt:"team logo",className:" object-cover rounded-full w-[clamp(2rem,40vw,10rem)] "}):e.jsx("div",{className:"aspect-square bg-gray-500 w-[clamp(2rem,40vw,10rem)]"})}),e.jsx("div",{className:"flex gap-2 justify-center items-center",children:e.jsx(S,{label:r("upload"),id:"file_upload",onChange:a=>x(a),accept:"image/*"})})]})]}),e.jsxs("div",{className:"mt-[clamp(3rem,30vh,9rem)] flex flex-col relative",children:[e.jsxs("div",{className:"grid gap-2",children:[e.jsxs("h3",{className:"font-medium",children:[r("delete")," ",t?.name]}),e.jsx("p",{children:r("deleteTeamText")})]}),e.jsxs(i,{disabled:l?.teams.length===1,onClick:()=>w(d),className:"border-2 border-danger text-danger rounded-md  dark:bg-danger dark:text-typography-dark dark:hover:opacity-70 disabled:opacity-40 disabled:cursor-not-allowed  enabled:hover:bg-danger enabled:hover:text-typography-dark transition-all duration-150 w-fit p-2 mt-4",children:[r("delete")," ",t?.name]}),e.jsx(T,{modalRef:d,children:e.jsx(C,{onDelete:u})})]})]})};export{U as default};
