"use client";
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { FormattedMessage, useIntl } from 'react-intl';
import { contactFormData } from './data'
import { useSelector } from 'react-redux';
// import PhoneInput from '../PhoneInput/phoneInput';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import axios from "axios";

function ContactFormContent() {
    const language = useSelector((state) => state.language.language);
    const intl = useIntl();

    const [phone, setPhone] = useState('');
    const [detectedCountry, setDetectedCountry] = useState('us');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [responseMsg, setResponseMsg] = useState(null);

    useEffect(() => {
        const detectCountry = async () => {
            try {
                const res = await fetch('https://ipapi.co/json/');
                const data = await res.json();
                if (data && data.country_code) {
                    setDetectedCountry(data.country_code.toLowerCase()); // örn: 'tr'
                }
            } catch (err) {
                console.error('Ülke tespiti yapılamadı:', err);
            }
        };

        detectCountry();
    }, []);

    useEffect(() => {
        if (responseMsg) {
            Swal.fire({
                icon: responseMsg.type,
                title: responseMsg.type === 'success' ? '✔️ Başarılı' : '❌ Hata',
                text: responseMsg.text,
                confirmButtonColor: responseMsg.type === 'success' ? '#10b981' : '#ef4444' // yeşil / kırmızı
            });
        }
    }, [responseMsg]);


    const api = axios.create({
        baseURL: "https://api.nutsroastermachine.com/api",
        timeout: 15000,
        headers: { "Content-Type": "application/json" },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseMsg(null);

        const payload = {
            ad_soyad: name,
            e_posta: email,
            telefon: phone,
            telefon2: phone,
            message: message,
        };

        try {
            const { data, status } = await api.post("/createContactMessage", payload);

            if (status >= 200 && status < 300) {
                setResponseMsg({
                    type: "success",
                    text: data?.msg || "Mesajınız başarıyla gönderildi.",
                });
                setName("");
                setEmail("");
                setPhone("");
                setMessage("");
            } else {
                setResponseMsg({
                    type: "error",
                    text: data?.msg || "Bir hata oluştu. Lütfen tekrar deneyin.",
                });
            }
        } catch (err) {
            // axios hata mesajı (sunucu döndüyse) veya ağ hatası
            const fallback =
                err?.response?.data?.msg ||
                err?.message ||
                "Sunucuya bağlanılamadı. Lütfen tekrar deneyin.";

            setResponseMsg({ type: "error", text: fallback });
            console.error("İstek hatası:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card className="rounded-2xl border border-zinc-200 bg-white p-6 shadow backdrop-blur-sm">
                            <CardHeader className="pb-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <MessageCircle className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <CardTitle className="text-2xl">
                                        <FormattedMessage id="form" />
                                    </CardTitle>
                                </div>
                                <CardDescription className="text-base">
                                    <FormattedMessage id='form_desc' />
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName" className="text-sm font-medium">
                                                <FormattedMessage id='name' />
                                            </Label>
                                            <Input
                                                id="firstName"
                                                placeholder={intl.formatMessage({ id: 'name' })}
                                                className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-sm font-medium">
                                                <FormattedMessage id='email' />
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder={intl.formatMessage({ id: 'email' })}
                                                className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-1 gap-6 w-full">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-sm font-medium">
                                                <FormattedMessage id='phone' />
                                            </Label>
                                            <PhoneInput
                                                value={phone}
                                                onChange={setPhone}
                                                inputStyle={{ width: '100%', borderRadius: "0.50rem", height: '3rem', borderColor: "#e5e7eb" }}
                                                country={detectedCountry}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-sm font-medium">
                                            <FormattedMessage id="message" />
                                        </Label>
                                        <Textarea
                                            id="message"
                                            placeholder={intl.formatMessage({ id: 'message' })}
                                            className="min-h-[240px] border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium">
                                        <Send className="mr-2 h-4 w-4" />
                                        {loading ? intl.formatMessage({ id: "sending" }) : <FormattedMessage id="send" />}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        {/* Contact Cards */}
                        <Card className="rounded-2xl border border-zinc-200 bg-white p-6 shadow hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-100 rounded-xl">
                                        <MapPin className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">
                                            <FormattedMessage id='address' />
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Eskihisar Mahallesi
                                            <br />
                                            8000 Sokak No:21/1
                                            <br />
                                            Merkezefendi / Denizli
                                            <br />
                                            Türkiye
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border border-zinc-200 bg-white p-6 shadow hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-green-100 rounded-xl">
                                        <Phone className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">
                                            <FormattedMessage id='phone' />
                                        </h3>
                                        <p className="text-gray-600">
                                            +90(258) 241 10 60
                                            <br />
                                            +90(532) 567 10 60
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border border-zinc-200 bg-white p-6 shadow hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-purple-100 rounded-xl">
                                        <Mail className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">
                                            <FormattedMessage id='email' />
                                        </h3>
                                        <p className="text-gray-600">
                                            info@eformaksan.com
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

function ContactForm() {
    const language = useSelector((state) => state.language.language);

    return (
        <ContactFormContent />
    )
}

export default ContactForm