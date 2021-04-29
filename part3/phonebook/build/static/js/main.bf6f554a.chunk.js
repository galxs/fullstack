(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{ 38:function(e,n,t){},40:function(e,n,t){'use strict';t.r(n);var o=t(2),s=t(15),r=t.n(s),c=t(6),a=t(3),i=t(4),u=t.n(i),l='/api/persons',d=function(){return u.a.get(l)},b=function(e){return u.a.post(l,e)},j=function(e,n){return u.a.put(''.concat(l,'/').concat(e),n).then((function(e){return e.data}))},f=(t(38),t(0)),h=function(e){return Object(f.jsx)('ul',{ children:e.fpersons.map((function(n,t){return Object(f.jsx)(p,{ person:n,setPersons:e.setPersons,persons:e.persons,sNM:e.sNM,sEM:e.sEM },t)})) })},m=function(e){return Object(f.jsx)('button',{ onClick:function(){window.confirm('Delete '.concat(e.name,'?'))&&u.a.delete('/api/persons/'.concat(e.id)).then((function(n){var t=e.persons.filter((function(n){return n.id!==e.id}));e.setPersons(t),e.setNotificationMessage(''.concat(e.name,' was removed from phonebook')),setTimeout((function(){e.setNotificationMessage(null)}),5e3)})).catch((function(n){e.setErrorMessage(''.concat(e.name,' does not exist in phonebook')),setTimeout((function(){e.setErrorMessage(null)}),5e3),e.setPersons(e.persons.filter((function(n){return n.id!==e.id})))}))},children:'delete' })},p=function(e){return Object(f.jsx)('div',{ children:Object(f.jsxs)('p',{ children:[e.person.name,' ',e.person.number,' ',Object(f.jsx)(m,{ id:e.person.id,setPersons:e.setPersons,persons:e.persons,name:e.person.name,setNotificationMessage:e.sNM,setErrorMessage:e.sEM })] }) })},O=function(e){return Object(f.jsx)('form',{ children:Object(f.jsxs)('div',{ children:['filter shown with ',Object(f.jsx)('input',{ value:e.value,onChange:e.onChange })] }) })},x=function(e){return Object(f.jsxs)('form',{ onSubmit:e.onSubmit,children:[Object(f.jsxs)('div',{ children:[' name: ',Object(f.jsx)('input',{ value:e.name,onChange:e.nameChange })] }),Object(f.jsxs)('div',{ children:['number: ',Object(f.jsx)('input',{ value:e.number,onChange:e.numberChange })] }),Object(f.jsx)('div',{ children:Object(f.jsx)('button',{ type:'submit',children:'add' }) })] })},g=function(e){var n=e.message;return null===n?null:Object(f.jsx)('div',{ className:'notification',children:n })},v=function(e){var n=e.message;return null===n?null:Object(f.jsx)('div',{ className:'error',children:n })},w=function(){var e=Object(o.useState)([]),n=Object(a.a)(e,2),t=n[0],s=n[1],r=Object(o.useState)(''),i=Object(a.a)(r,2),u=i[0],l=i[1],m=Object(o.useState)(''),p=Object(a.a)(m,2),w=p[0],M=p[1],k=Object(o.useState)(''),C=Object(a.a)(k,2),N=C[0],E=C[1],P=Object(o.useState)(null),S=Object(a.a)(P,2),T=S[0],y=S[1],D=Object(o.useState)(null),J=Object(a.a)(D,2),L=J[0],B=J[1];Object(o.useEffect)((function(){d().then((function(e){s(e.data)}))}),[]);var I=t.filter((function(e){return e.name.toLowerCase().indexOf(N.toLowerCase())>-1}));return Object(f.jsxs)('div',{ children:[Object(f.jsx)('h2',{ children:'Phonebook' }),Object(f.jsx)(v,{ message:L }),Object(f.jsx)(g,{ message:T }),Object(f.jsx)(O,{ value:N,onChange:function(e){E(e.target.value)} }),Object(f.jsx)('h2',{ children:'add a new' }),Object(f.jsx)(x,{ onSubmit:function(e){var n=t[t.length-1].id+1;e.preventDefault();for(var o={ name:u,number:w,id:n },r=1,a=void 0,i=0;i<t.length;i++){if(t[i].name===u&&t[i].number!==w){r=2,a=t[i].id;break}if(t[i].name===u){alert(u+' is already in phonebook'),l(''),M(''),r=0;break}t[i].name!==u&&(r=1)}if(1===r)b(o).then((function(e){s(t.concat(o)),l(''),M(''),y(''.concat(o.name,' was added to the phonebook')),setTimeout((function(){y(null)}),5e3),d().then((function(e){s(e.data)}))})).catch((function(e){console.log(e.response.data.error),B(e.response.data.error),setTimeout((function(){B(null)}),5e3)}));else if(2===r){var f=t.find((function(e){return e.id===a})),h=Object(c.a)(Object(c.a)({},f),{},{ number:w });window.confirm(''.concat(f.name,' is already added to the phonebook, replace the old number with a new one?'))&&j(f.id,h).then((function(e){s(t.map((function(e){return e.id!==f.id?e:h}))),l(''),M(''),y('Person\'s \''.concat(f.name,'\' number was changed')),setTimeout((function(){y(null)}),5e3)})).catch((function(e){console.log(e.response.data.error),B(e.response.data.error),setTimeout((function(){B(null)}),5e3),s(t.filter((function(e){return e.id!==f.id})))})),l(''),M('')}},name:u,nameChange:function(e){l(e.target.value)},number:w,numberChange:function(e){M(e.target.value)} }),Object(f.jsx)('h2',{ children:'Numbers' }),Object(f.jsx)(h,{ fpersons:I,setPersons:s,persons:t,sNM:y,sEM:B })] })};r.a.render(Object(f.jsx)(w,{}),document.getElementById('root'))} },[[40,1,2]]])
//# sourceMappingURL=main.bf6f554a.chunk.js.map