//
//  ViewController.swift
//  come-in-pillow-swift
//
//  Created by yuna on 2019/10/20.
//  Copyright © 2019 yuna. All rights reserved.
//

import UIKit
import Firebase
import GoogleSignIn

class LoginViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        GIDSignIn.sharedInstance()?.presentingViewController = self
    }


}

