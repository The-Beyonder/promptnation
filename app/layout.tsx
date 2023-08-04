import '@/styles/global.css';
import Nav from '@/components/Nav';
import Provider from '@/components/Provider';

export const metadata = {
    title: "Promptio",
    description:'Discover and share AI Prompt',
}

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
<html lang="en">
    <body>
        <Provider session={undefined}> 
            <div className="main">
                <div className="gradient"/>
            </div>
            <main className='app'>
                <Nav/>
                {children}
            </main>
        </Provider>
    </body>
</html>
  )
}

export default RootLayout