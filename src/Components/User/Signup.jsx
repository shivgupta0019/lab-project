// import React from 'react'
// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import "../../Components/Style/userotp.css";
// import FormValidators from './FormValidators';
// import axios from 'axios';


// export default function SignupPage() {
//     let [data, setData] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         password: "",
//         cpassword: "",
//     })

//     let [errorMessage, setErrorMessage] = useState({
//         name: "Name Field is Mendatory",
//         email: "Email Address Field is Mendatory",
//         phone: "Phone Number Field is Mendatory",
//         password: "Password Field is Mendatory",
//     })

//     let [show, setShow] = useState(false)
//     let navigate = useNavigate()

//     function getInputData(e) {
//         let { name, value } = e.target
//         setData({ ...data, [name]: value })
//         setErrorMessage({ ...errorMessage, [name]: FormValidators(e) })
//     }




// async function postData(e) {
//     e.preventDefault();

//     let error = Object.values(errorMessage).find(x => x !== "");
//     if (error) {
//         setShow(true);
//         return;
//     }

//     if (data.password !== data.cpassword) {
//         newFunction();
//         return;
//     }

//     try {
//         let res = await axios.post("http://localhost:5000/api/signup", {
//             name: data.name,
//             email: data.email,
//             phone: data.phone,
//             password: data.password
//         });

//         alert(res.data.message);
//         navigate("/");

//     } catch (err) {
//         alert(err.response?.data?.message || "Error");
//     }

//     function newFunction() {
//         setShow(true);
//     }
// }
//     return (
//         <>
//             <section className="login  footer-padding">
//                 <div className="col-lg-6 col-sm-10 col-md-8 m-auto bg-light p-5  rounded my-5">
//                     <h5 className="text-center mb-3">Create Your Free Account</h5>
//                     <form onSubmit={postData}>
//                         <div className='row'>

//                             <div className='col-md-6 mb-3'>
//                                 <label>Name*</label>
//                                 <input type='text' name='name' onChange={getInputData}
//                                     className={`form-control ${show && errorMessage.name ? 'border-danger' : 'myborder'}`}
//                                     placeholder='Full Name' />
//                                 {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
//                             </div>

//                             <div className='col-md-6 mb-3'>
//                                 <label>Phone*</label>
//                                 <input type='text' name='phone' onChange={getInputData}
//                                     className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'myborder'}`}
//                                     placeholder='Phone Number' />
//                                 {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
//                             </div>

//                             <div className='col-12 mb-3'>
//                                 <label>Email*</label>
//                                 <input type='email' name='email' onChange={getInputData}
//                                     className={`form-control ${show && errorMessage.email ? 'border-danger' : 'myborder'}`}
//                                     placeholder='Email Address' />
//                                 {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
//                             </div>

//                             <div className='col-md-6 mb-3'>
//                                 <label>Possword*</label>
//                                 <input type='password' name='password' onChange={getInputData}
//                                     className={`form-control ${show && errorMessage.password ? 'border-danger' : 'myborder'}`}
//                                     placeholder='Enter Password' />
//                                 {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : null}
//                             </div>

//                             <div className='col-md-6 mb-3'>
//                                 <label>Confirm Possword*</label>
//                                 <input type='password' name='cpassword' onChange={getInputData}
//                                     className={`form-control ${show && errorMessage.password ? 'border-danger' : 'myborder'}`}
//                                     placeholder='Confirm Password' />
//                             </div>

//                         </div>

//                         <div className="col-12 text-center">
//                             <button type='submit'
//                                 className="btn btn-primary mybackground btn-lg rounded-pill p-3 my-3 w-50"
//                                 style={{ border: "none" }}>
//                                 Create an Account
//                             </button>

//                             <span className="shop-account d-block"><Link to="/">Already have an account ?</Link></span>
                           
//                         </div>

//                     </form>
//                 </div>
//             </section>
//         </>
//     )
// }


import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormValidators from './FormValidators';
import axios from 'axios';

export default function SignupPage() {
    let [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mendatory",
        email: "Email Address Field is Mendatory",
        phone: "Phone Number Field is Mendatory",
        password: "Password Field is Mendatory",
    })

    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: FormValidators(e) })
    }

    async function postData(e) {
        e.preventDefault();

        let error = Object.values(errorMessage).find(x => x !== "");
        
        if (error) {
            setShow(true);
            return;
        }

        if (data.password !== data.cpassword) {
            newFunction();
            return;
        }

        try {
            let res = await axios.post("http://localhost:5000/api/signup", {
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password
            });

            alert(res.data.message);
            navigate("/");

        } catch (err) {
            alert(err.response?.data?.message || "Error");
        }

        function newFunction() {
            setShow(true);
        }
    }

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f4f4f2",
            padding: "24px",
            fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
            boxSizing: "border-box",
        }}>

            {/* Google Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap"
                rel="stylesheet"
            />

            <div style={{
                display: "flex",
                width: "100%",
                maxWidth: "900px",
                minHeight: "600px",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
            }}>

                {/* ══════════════════════════════
                    LEFT WHITE PANEL — FORM
                ══════════════════════════════ */}
                <div style={{
                    flex: 1,
                    background: "#ffffff",
                    padding: "48px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}>

                    {/* Top bar */}
                    <div style={{
                        display: "flex", alignItems: "center",
                        justifyContent: "space-between", marginBottom: "36px",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{
                                width: "30px", height: "30px", background: "#0f0f0f",
                                borderRadius: "7px", display: "flex",
                                alignItems: "center", justifyContent: "center",
                                fontFamily: "'Playfair Display', serif",
                                color: "#fff", fontSize: "14px", fontWeight: 600,
                            }}>A</div>
                            <span style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "15px", color: "#0f0f0f", fontWeight: 600,
                            }}>Aryan Group</span>
                        </div>
                        <span style={{
                            fontSize: "11px", color: "rgba(0,0,0,0.35)",
                            letterSpacing: "0.06em", textTransform: "uppercase",
                        }}>New Account</span>
                    </div>

                    {/* Heading */}
                    <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "26px", fontWeight: 600,
                        color: "#0f0f0f", margin: "0 0 6px 0", lineHeight: 1.2,
                    }}>Create your account</h2>
                    <p style={{
                        fontSize: "13px", color: "rgba(0,0,0,0.45)",
                        fontWeight: 300, margin: "0 0 28px 0",
                    }}>Join the Aryan Group portal today</p>

                    <form onSubmit={postData} noValidate>

                        {/* Row: Name + Phone */}
                        <div style={{ display: "flex", gap: "16px", marginBottom: "18px" }}>

                            {/* Name */}
                            <div style={{ flex: 1 }}>
                                <label style={{
                                    display: "flex", alignItems: "center", gap: "6px",
                                    fontSize: "11px", fontWeight: 500, color: "rgba(0,0,0,0.5)",
                                    textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px",
                                }}>
                                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.45 }}>
                                        <circle cx="8" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2" />
                                        <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                    </svg>
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    onChange={getInputData}
                                    style={{
                                        width: "100%", height: "44px",
                                        border: show && errorMessage.name ? "1px solid #e74c3c" : "1px solid rgba(0,0,0,0.1)",
                                        borderRadius: "10px", padding: "0 14px",
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: "13px", color: "#0f0f0f",
                                        background: show && errorMessage.name ? "#fff9f9" : "#fafafa",
                                        outline: "none", boxSizing: "border-box",
                                    }}
                                />
                                {show && errorMessage.name && (
                                    <p style={{ fontSize: "11px", color: "#c0392b", margin: "4px 0 0 0" }}>{errorMessage.name}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div style={{ flex: 1 }}>
                                <label style={{
                                    display: "flex", alignItems: "center", gap: "6px",
                                    fontSize: "11px", fontWeight: 500, color: "rgba(0,0,0,0.5)",
                                    textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px",
                                }}>
                                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.45 }}>
                                        <rect x="4" y="1" width="8" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                                        <circle cx="8" cy="12" r="0.8" fill="currentColor" />
                                    </svg>
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number"
                                    onChange={getInputData}
                                    style={{
                                        width: "100%", height: "44px",
                                        border: show && errorMessage.phone ? "1px solid #e74c3c" : "1px solid rgba(0,0,0,0.1)",
                                        borderRadius: "10px", padding: "0 14px",
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: "13px", color: "#0f0f0f",
                                        background: show && errorMessage.phone ? "#fff9f9" : "#fafafa",
                                        outline: "none", boxSizing: "border-box",
                                    }}
                                />
                                {show && errorMessage.phone && (
                                    <p style={{ fontSize: "11px", color: "#c0392b", margin: "4px 0 0 0" }}>{errorMessage.phone}</p>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div style={{ marginBottom: "18px" }}>
                            <label style={{
                                display: "flex", alignItems: "center", gap: "6px",
                                fontSize: "11px", fontWeight: 500, color: "rgba(0,0,0,0.5)",
                                textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px",
                            }}>
                                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.45 }}>
                                    <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                                    <path d="M1.5 4l6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                </svg>
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                onChange={getInputData}
                                style={{
                                    width: "100%", height: "44px",
                                    border: show && errorMessage.email ? "1px solid #e74c3c" : "1px solid rgba(0,0,0,0.1)",
                                    borderRadius: "10px", padding: "0 14px",
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: "13px", color: "#0f0f0f",
                                    background: show && errorMessage.email ? "#fff9f9" : "#fafafa",
                                    outline: "none", boxSizing: "border-box",
                                }}
                            />
                            {show && errorMessage.email && (
                                <p style={{ fontSize: "11px", color: "#c0392b", margin: "4px 0 0 0" }}>{errorMessage.email}</p>
                            )}
                        </div>

                        {/* Row: Password + Confirm Password */}
                        <div style={{ display: "flex", gap: "16px", marginBottom: "28px" }}>

                            {/* Password */}
                            <div style={{ flex: 1 }}>
                                <label style={{
                                    display: "flex", alignItems: "center", gap: "6px",
                                    fontSize: "11px", fontWeight: 500, color: "rgba(0,0,0,0.5)",
                                    textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px",
                                }}>
                                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.45 }}>
                                        <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                                        <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                    </svg>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    onChange={getInputData}
                                    style={{
                                        width: "100%", height: "44px",
                                        border: show && errorMessage.password ? "1px solid #e74c3c" : "1px solid rgba(0,0,0,0.1)",
                                        borderRadius: "10px", padding: "0 14px",
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: "13px", color: "#0f0f0f",
                                        background: show && errorMessage.password ? "#fff9f9" : "#fafafa",
                                        outline: "none", boxSizing: "border-box",
                                    }}
                                />
                                {show && errorMessage.password && (
                                    <p style={{ fontSize: "11px", color: "#c0392b", margin: "4px 0 0 0" }}>{errorMessage.password}</p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div style={{ flex: 1 }}>
                                <label style={{
                                    display: "flex", alignItems: "center", gap: "6px",
                                    fontSize: "11px", fontWeight: 500, color: "rgba(0,0,0,0.5)",
                                    textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px",
                                }}>
                                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.45 }}>
                                        <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                                        <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                        <path d="M6 11l1.5 1.5L10 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Confirm
                                </label>
                                <input
                                    type="password"
                                    name="cpassword"
                                    placeholder="Confirm Password"
                                    onChange={getInputData}
                                    style={{
                                        width: "100%", height: "44px",
                                        border: show && errorMessage.password ? "1px solid #e74c3c" : "1px solid rgba(0,0,0,0.1)",
                                        borderRadius: "10px", padding: "0 14px",
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: "13px", color: "#0f0f0f",
                                        background: "#fafafa",
                                        outline: "none", boxSizing: "border-box",
                                    }}
                                />
                            </div>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            style={{
                                width: "100%", height: "48px",
                                background: "#0f0f0f", color: "#fff",
                                border: "none", borderRadius: "10px",
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "14px", fontWeight: 500,
                                cursor: "pointer", display: "flex",
                                alignItems: "center", justifyContent: "center",
                                gap: "10px", letterSpacing: "0.02em",
                            }}
                        >
                            Create Account
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                    </form>

                    {/* Divider */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "22px 0" }}>
                        <span style={{ flex: 1, height: "0.5px", background: "rgba(0,0,0,0.1)" }} />
                        <span style={{
                            fontSize: "11px", color: "rgba(0,0,0,0.3)",
                            textTransform: "uppercase", letterSpacing: "0.06em",
                        }}>or</span>
                        <span style={{ flex: 1, height: "0.5px", background: "rgba(0,0,0,0.1)" }} />
                    </div>

                    {/* Login link */}
                    <p style={{ textAlign: "center", fontSize: "13px", color: "rgba(0,0,0,0.4)", margin: 0 }}>
                        Already have an account?{" "}
                        <Link to="/" style={{
                            color: "#0f0f0f", fontWeight: 500,
                            textDecoration: "underline", textUnderlineOffset: "2px",
                        }}>Login</Link>
                    </p>

                </div>

                {/* ══════════════════════════════
                    RIGHT DARK PANEL — BRANDING
                ══════════════════════════════ */}
                <div style={{
                    flex: "1.1",
                    background: "#0f0f0f",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "48px 44px",
                    position: "relative",
                    overflow: "hidden",
                }}>

                    {/* Decorative circle 1 */}
                    <div style={{
                        position: "absolute", width: "340px", height: "340px",
                        borderRadius: "50%", border: "0.5px solid rgba(255,255,255,0.07)",
                        bottom: "-80px", right: "-80px", pointerEvents: "none",
                    }} />

                    {/* Decorative circle 2 */}
                    <div style={{
                        position: "absolute", width: "200px", height: "200px",
                        borderRadius: "50%", border: "0.5px solid rgba(255,255,255,0.05)",
                        bottom: "60px", left: "-40px", pointerEvents: "none",
                    }} />

                    {/* Large background letter */}
                    <span style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "96px", fontWeight: 600,
                        color: "rgba(255,255,255,0.06)",
                        position: "absolute", top: "28px", right: "36px",
                        lineHeight: 1, letterSpacing: "-4px",
                        userSelect: "none", pointerEvents: "none",
                    }}>A</span>

                    {/* Content */}
                    <div style={{ position: "relative", zIndex: 1 }}>

                        {/* Tag pill */}
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: "7px",
                            background: "rgba(255,255,255,0.08)",
                            border: "0.5px solid rgba(255,255,255,0.12)",
                            borderRadius: "100px", padding: "6px 14px",
                            fontSize: "11px", color: "rgba(255,255,255,0.55)",
                            letterSpacing: "0.08em", textTransform: "uppercase",
                            fontWeight: 500, marginBottom: "20px",
                        }}>
                            <span style={{
                                width: "6px", height: "6px",
                                background: "#fff", borderRadius: "50%", opacity: 0.7,
                            }} />
                            Join Us Today
                        </div>

                        <h1 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "34px", fontWeight: 600,
                            color: "#ffffff", lineHeight: 1.25,
                            margin: "0 0 14px 0",
                        }}>
                            Aryan Group<br />of Companies
                        </h1>

                        <p style={{
                            fontSize: "13px", color: "rgba(255,255,255,0.45)",
                            fontWeight: 300, lineHeight: 1.7,
                            maxWidth: "260px", margin: "0 0 24px 0",
                        }}>
                            Become part of a growing enterprise with access to world-class tools and teams.
                        </p>

                        {/* Divider line */}
                        <div style={{
                            width: "32px", height: "1px",
                            background: "rgba(255,255,255,0.2)",
                            marginBottom: "24px",
                        }} />

                        {/* Perks list */}
                        {[
                            "Instant portal access",
                            "Dedicated support team",
                            "Secure & encrypted data",
                        ].map((perk) => (
                            <div key={perk} style={{
                                display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px",
                            }}>
                                <div style={{
                                    width: "20px", height: "20px", borderRadius: "50%",
                                    background: "rgba(255,255,255,0.08)",
                                    border: "0.5px solid rgba(255,255,255,0.15)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    flexShrink: 0,
                                }}>
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M2 5l2.5 2.5L8 3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>
                                    {perk}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}