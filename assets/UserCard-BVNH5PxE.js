import{j as e,t as a,B as i}from"./index-ChT_ZIC7.js";import{C as c}from"./Modal-axEZC8xA.js";const m=({className:r})=>e.jsx("svg",{className:`[&>*]:fill-bg-dark [&>*]:dark:fill-bg-light  ${r}`,width:"16",height:"16",viewBox:"0 0 10 10",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M3.7444 7.50927C4.64547 7.50927 5.49654 7.18985 6.17383 6.60882L9.46621 9.90963C9.52715 9.97089 9.60748 10.0015 9.68749 10.0015C9.76719 10.0015 9.8472 9.97121 9.90815 9.91026C10.0304 9.78837 10.0307 9.59052 9.90878 9.46832L6.61359 6.165C7.84721 4.69165 7.77533 2.48538 6.39324 1.10017C5.68563 0.390685 4.74486 0 3.74409 0C2.74331 0 1.80254 0.390685 1.09493 1.10017C-0.364977 2.56383 -0.364977 4.94575 1.09493 6.40941C1.80285 7.11858 2.74362 7.50927 3.7444 7.50927ZM1.53781 1.54148C2.12728 0.950457 2.91083 0.625095 3.7444 0.625095C4.57796 0.625095 5.36152 0.950457 5.95098 1.54148C7.16836 2.76198 7.16836 4.7476 5.95098 5.9681C5.36152 6.55912 4.57796 6.88449 3.7444 6.88449C2.91083 6.88449 2.12728 6.55912 1.53781 5.9681C0.320752 4.7476 0.320752 2.76198 1.53781 1.54148Z",fill:"#231F20"})}),h=r=>{const s=new Date(r);if(isNaN(s.getTime()))return"Never";const n=new Date().getTime()-s.getTime(),t=Math.floor(n/(1e3*60*60*24));return t===0?a("today"):t===1?a("yesterday"):t<7?`${t} ${a("daysAgo")}`:new Intl.DateTimeFormat("en-GB",{weekday:"short",month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"numeric",second:"numeric",hour12:!0,timeZone:"Europe/Amsterdam"}).format(s)},u=()=>e.jsx("svg",{className:"fill-bg-dark ",height:"20",width:"20",version:"1.1",id:"Capa_1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 309.059 309.059",children:e.jsx("g",{children:e.jsx("g",{children:e.jsx("path",{d:`M280.71,126.181h-97.822V28.338C182.889,12.711,170.172,0,154.529,0S126.17,12.711,126.17,28.338
			v97.843H28.359C12.722,126.181,0,138.903,0,154.529c0,15.621,12.717,28.338,28.359,28.338h97.811v97.843
			c0,15.632,12.711,28.348,28.359,28.348c15.643,0,28.359-12.717,28.359-28.348v-97.843h97.822
			c15.632,0,28.348-12.717,28.348-28.338C309.059,138.903,296.342,126.181,280.71,126.181z`})})})}),x=({children:r})=>e.jsx("div",{className:"grid grid-cols-2 gap-2 max-h-[100px] overflow-y-auto custom-scrollbar-modal mt-4",children:r}),g=({name:r,img:s,onClick:o})=>e.jsxs("div",{className:"grid grid-cols-4 gap-2 max-w-[150px] items-center justify-start px-1 py-1 border-2 border-typography-light dark:border-typography-dark  rounded-md",children:[e.jsx("img",{className:"w-full max-w-8 aspect-square rounded-full col-span-1",src:s}),e.jsx("p",{className:"col-span-2 col-start-2 max-w-[80px] truncate text-xs",children:r}),e.jsx(i,{type:"button",onClick:o,className:"col-start-4  ",children:e.jsx(c,{className:"w-4 h-4"})})]});export{u as A,x as C,m as S,g as U,h as f};
