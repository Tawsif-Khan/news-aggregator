<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $subject;
    public $title;
    public $body;
    public $name;
    public $address;
    public $files;
    public $template;
    public $meeting;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($detail)
    {
        $this->title = $detail['title'];
        $this->body = $detail['body'];
        $this->name = $detail['name'] ?? env('MAIL_FROM_NAME', 'News');
        $this->address = $detail['address'] ?? env('MAIL_FROM_ADDRESS', 'news@domain.com');
        $this->files = $detail['attachments'] ?? [];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $this->subject($this->title)
            ->view('email')
            ->from($this->address, $this->name);
        foreach ($this->files as $attachment) {
            $this->attach(
                public_path($attachment),
                [
                    'as' => substr(basename($attachment), 10),
                    //'mime' => mime_content_type(public_path($attachment))
                ]
            );
        }
        return $this;
    }
}
