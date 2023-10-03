
function Input() {
    

    const estiloDoBotao = {
        backgroundColor: '#6CB2C1',
        border: 'none',
        textDecoration: 'none',
      }
    
    
return (
<>
<h1> Sign up </h1>
<form onSubmit={signup}> 
<input type='email' placeholder='nome@gmail.com' ref={emailRef}/>
<input type='password' placeholder='senha' ref={passwordRef} />
<Button type='submit' className='bt-cadastro' style={estiloDoBotao}>
          Cadastro
        </Button></form>
</>
)
};

export default Input;