import{u as c,a as x,D as d,b as g,j as e,H as h,L as l,I as m}from"./index-ChT_ZIC7.js";import{F as u,A as p}from"./AuthWithProviders-dW3LPpum.js";const v=()=>{const i=c(),{email:s,password:r,errorCode:n}=x(t=>t.auth),{t:a}=d(),f=g(),o=async t=>{t.preventDefault(),i(m({email:s,password:r})).then(()=>f(0))};return e.jsx("div",{"aria-label":"Login form",className:"flex flex-col items-center justify-center min-h-screen ",children:e.jsxs("div",{className:"flex flex-col items-center w-full max-w-[400px]",children:[e.jsxs("div",{className:"flex flex-col gap-2 max-w-[200px] items-center",children:[e.jsx(h,{children:"Artiflare"}),e.jsx("p",{className:"text-xl font-medium",children:a("login")})]}),e.jsx(u,{email:s,password:r,errorCode:n,isSignUp:!1,children:a("logIn"),onSubmit:t=>o(t)}),e.jsx(p,{}),e.jsxs("div",{className:"flex gap-2 mt-6 mb-9",children:[e.jsx("p",{children:a("dontHaveAnAccount")}),e.jsx(l,{className:"relative after:absolute after:w-full after:h-px after:bg-bg-dark dark:after:bg-bg-light after:top-full after:left-0 hover:after:scale-x-0 after:transition-all after:duration-200 after:origin-left ",to:"/auth/signup",children:a("signUp")})]}),e.jsx(l,{className:"relative after:absolute after:w-full after:h-px after:bg-bg-dark dark:after:bg-bg-light after:top-full after:left-0 hover:after:scale-x-0 after:transition-all after:duration-200 after:origin-left",to:"/",children:a("goBack")})]})})};export{v as default};
