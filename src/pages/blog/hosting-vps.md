---
layout: ../../layouts/Blog.astro
title: "Hosting on a Virtual Private Server (VPS)"
date: "11 November 2022"
tags: ["vps", "digitalocean"]
---

This tutorial talks about the why and the how on hosting services with a Virtual Private Server, especially for a hobbyist. I am not an expert in this! So, take this more as the notes of my experience rather than a full-blown tutorial!

## Pros of VPS

### Cost

In contrast to paying for _each_ of your applications or servers, you only need to pay a single fee. This is even more important if you like experimenting with different projects.

### Flexibility

Since you have root access to the remote server, the only limitation is your imagination (and the server resources). You can run _anything_ on it.

You can use it to host websites, servers for files and other media, email server, gaming servers, as a VPN proxy, or just as a separate environment that you can access from anywhere.

### Downtime

VPS solutions guarantee a very low downtime, without any action from your side. In comparison to hosting the server off of your own machine, you don't have to worry about your machine shutting off unexpectedly or your internet being unstable.

## Cons of VPS

### Manual configuration

One major downside to hosting with a VPS is that you need to do a fair bit of work yourself. There isn't a button that just makes everything work. You might have to spend hours setting up a project if you're not already familiar with similar systems.

## Which options to choose?

### Provider: DigitalOcean

Through my (brief) searches on the providers, the major providers are all fairly similar in terms of pricing and reliability. But I landed on DigitalOcean.

In my personal usage, I have not ran into any issues regarding DigitalOcean. Everything worked as expected.

If you ended up picking DigitalOcean too, you might want to consider using my referral code: https://m.do.co/c/17bb84eb53ec. You'll get $200 in credit over 60 days.

### Which plan?

If you're like me and only plan on hosting a few of your personal projects, a cheaper plan will do just fine.

#### My plan

I am currently using my VPS for a Ubuntu machine that runs a PostgreSQL instance, a Rails web application, a compiled Golang web application and a Nginx instance serving connections to my various applications on a 1 vCPU, 1GB RAM, 25GB SSD plan, which costs me $6 per month.

My CPU usage averages less than 1%, memory (RAM) averages about 60% and disk usage averages about 30%.

I probably could have chosen a cheaper plan instead, but having extra resources gives me more room to play around with.

I recommend that you start with the most basic plan, because you can always upgrade it in the future.

### Location

Make sure you pick a suitable location, preferably one where most of your traffic will come from. If you're unsure, picking the location nearest to you is probably the best bet!

The further your users physically are from the server, the higher the latency and the worser their experience. :/

## Domain

If you intend to serve web applications with your VPS, you definitely a domain of your own. You don't want your users to have to type out your server's IP address just to visit your site.

> Side note: You can add as many subdomains as you want!
> A subdomain is the bit that goes at the start of the url, for example: [tm.jinwei.dev](https://tm.jinwei.dev).

### Google Domains

There are a couple of places to buy your domain from, but I bought mine from [Google Domains](https://domains.google.com/). Take note that some suffixes (the `.com` part) _require_ a SSL certificate because they are HTTPS only. One such example is `.dev`.

To get a **free** SSL certificate, check out the [SSL section](#ssl-lets-encrypt--certbot).

If you are interested, you can learn more about HTTP Strict Transport Security preload [here](https://hstspreload.org/).

## SSL: Let's Encrypt & Certbot

There is this really cool project called [Let's Encrypt](https://letsencrypt.org/getting-started/) that acts as a free and automated certificate authority.

Their recommended solution is to use [Certbot](https://certbot.eff.org/). The website offers very simple yet comprehensive [instructions](https://certbot.eff.org/instructions) on setting up Certbot!

## systemd

To quote [wikipedia](https://en.wikipedia.org/wiki/Systemd): "systemd is a software suite that provides an array of system components for Linux operating systems".

I use `service` from systemd to ensure that my applications are always running. If an application crashes, it will immediately restart it. Even if the entire server is to be restarted, the applications will boot up again shortly after, ensuring minimal downtime.

You should use `/etc/systemd/service` folder to place your `.service` files because that's the typical folder for user-created services.

This is the `organius.service` file that I use to keep my [`organius` application](https://organius.jinwei.dev) alive. It is really simple, but gets the job done. This particular application is running from a binary executable, so that's where the `ExecStart` is pointing to!

```
[Unit]
Description=organius

[Service]
Type=simple
Restart=always
RestartSec=5s
ExecStart=/root/git/organius/main

[Install]
WantedBy=multi-user.target
```

Here are some `service` commands that might come in handy. Replace `APP` with your application name.

```sh
service APP start
service APP stop
service APP status
```

## Conclusion

I learnt a lot from configuring and setting up this server. Even though I am in no way an expert right now, I definitely hope to continue improving! It was a really fun, albeit tedious, experience for me and I'm glad that I took the step to make one.

If you were planning on setting up one too, I hope this helped out in some way :D
