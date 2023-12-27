import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player'

function Notfound() {
  return (
	<motion.div
	animate={{width: '100%'}}
    initial={{width: 0}}
    exit={{x: window.innerWidth}}
	>
		<div className="h-screen lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
            <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                <div className="relative">
                    <div className="absolute">
                        <div className="">
                            <h1 className="my-2 text-gray-800 font-bold text-2xl">
                                Looks like you've found the
                                doorway to the great nothing
                            </h1>
                            <p className="my-2 text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p>
                            <Link to='/' className="btn btn-outline sm:w-full lg:w-auto text-black">Take me there!</Link>
                        </div>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/G9DC8S0/404-2.png" alt=""/>
                    </div>
                </div>
            </div>
            <div>
				<Player src='/lotties/notfound.json' loop autoplay />
            </div>
    	</div>
	</motion.div>
  )
}

export default Notfound