import { useRef } from "react";
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";

const FeedBack = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_b8y4c1n', 'template_iiqk70k', form.current, {
                publicKey: 'DZDuik9Hnamjg0Cla',
            })
            .then(
                () => {
                    toast.success('Email Send SuccessFull !!!')
                    form.current.reset();
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    return (
        <div className="bg-gradient-to-l from-blue-50 to-white py-16">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-semibold text-gray-800 mb-6">Contact Me</h2>
                <p className="text-lg text-gray-800 mb-10 lg:w-4/12 mx-auto">Feel free to reach out to me by filling out the form below, and I will get back to you as soon as possible.</p>

                <div className="flex justify-center max-sm:flex-col items-center mt-12 gap-12 lg:gap-24">
                    <div className="text-4xl lg:text-5xl font-serif sm:w-4/12">
                        Find Me easily Contact without any technical skills
                    </div>
                    <div className="w-full max-w-lg">
                        <div className="card bg-base-100 shadow-xl rounded-lg p-8">
                            <form className="space-y-6" ref={form} onSubmit={sendEmail}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg">Name</span>
                                    </label>
                                    <input type="text" placeholder="Your Name" name="user_name" className="input input-bordered w-full" required />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg">Email</span>
                                    </label>
                                    <input type="email" placeholder="Your Email" name="user_email" className="input input-bordered w-full" required />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-lg">Message</span>
                                    </label>
                                    <textarea placeholder="Your Message" name="message" className="textarea textarea-bordered w-full" required></textarea>
                                </div>

                                <div className="form-control mt-4">
                                    <button className="btn btn-primary w-full">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedBack;
